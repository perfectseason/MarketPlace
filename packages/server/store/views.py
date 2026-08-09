from django.db.models import Count
from django.shortcuts import get_object_or_404

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
)
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.apps import apps
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import Customer, Order

from .filters import ProductFilter
from .pagination import DefaultPagination
from .permissions import (
    IsAdminOrReadOnly,
    ViewCustomerHistoryPermission,
)
from .serializers import (
    AddCartItemSerializer,
    CartItemSerializer,
    CartSerializer,
    CollectionSerializer,
    CreateOrderSerializer,
    CustomerSerializer,
    OrderSerializer,
    ProductReadSerializer,
    ProductWriteSerializer,
    ReviewSerializer,
    UpdateCartItemSerializer,
    UpdateOrderSerializer,
)


def get_model(name):
    return apps.get_model("store", name)


class ProductViewSet(ModelViewSet):
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_class = ProductFilter
    pagination_class = DefaultPagination
    permission_classes = [IsAdminOrReadOnly]

    search_fields = [
        "title",
        "description",
    ]

    ordering_fields = [
        "unit_price",
        "last_update",
    ]

    def get_queryset(self):
        return get_model("Product").objects.all()

    def get_serializer_class(self):
        if self.request.method in ["POST", "PUT", "PATCH"]:
            return ProductWriteSerializer

        return ProductReadSerializer

    def get_serializer_context(self):
        return {
            "request": self.request,
        }

    def destroy(self, request, *args, **kwargs):
        if get_model("OrderItem").objects.filter(
            product_id=kwargs["pk"]
        ).exists():
            return Response(
                {
                    "error": (
                        "Product cannot be deleted because "
                        "it is associated with an order item."
                    )
                },
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )

        return super().destroy(request, *args, **kwargs)


class CollectionViewSet(ModelViewSet):
    serializer_class = CollectionSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return get_model("Collection").objects.annotate(
            products_count=Count("products")
        )

    def destroy(self, request, *args, **kwargs):
        if get_model("Product").objects.filter(
            collection_id=kwargs["pk"]
        ).exists():
            return Response(
                {
                    "error": (
                        "Collection cannot be deleted because "
                        "it includes one or more products."
                    )
                },
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )

        return super().destroy(request, *args, **kwargs)


class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return get_model("Review").objects.filter(
            product_id=self.kwargs["product_pk"]
        )

    def get_serializer_context(self):
        return {
            "product_id": self.kwargs["product_pk"]
        }


class CartViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    serializer_class = CartSerializer

    def get_queryset(self):
        return get_model("Cart").objects.prefetch_related(
            "items__product"
        )


class CartItemViewSet(ModelViewSet):
    http_method_names = [
        "get",
        "post",
        "patch",
        "delete",
    ]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return AddCartItemSerializer

        if self.request.method == "PATCH":
            return UpdateCartItemSerializer

        return CartItemSerializer

    def get_serializer_context(self):
        return {
            "cart_id": self.kwargs["cart_pk"]
        }

    def get_queryset(self):
        return (
            get_model("CartItem").objects
            .filter(cart_id=self.kwargs["cart_pk"])
            .select_related("product")
        )


class CustomerViewSet(ModelViewSet):
    serializer_class = CustomerSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return get_model("Customer").objects.all()

    @action(
        detail=True,
        permission_classes=[ViewCustomerHistoryPermission],
    )
    def history(self, request, pk=None):
        return Response("ok")

    @action(
        detail=False,
        methods=["GET", "PUT"],
        permission_classes=[IsAuthenticated],
    )
    def me(self, request):
        customer = get_object_or_404(
            get_model("Customer"),
            user_id=request.user.id,
        )

        if request.method == "GET":
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)

        serializer = CustomerSerializer(
            customer,
            data=request.data,
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.none()
    serializer_class = OrderSerializer
    http_method_names = [
        "get",
        "post",
        "patch",
        "delete",
        "head",
        "options",
    ]

    def get_permissions(self):
        if self.request.method in ["PATCH", "DELETE"]:
            return [IsAdminUser()]

        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateOrderSerializer

        if self.request.method == "PATCH":
            return UpdateOrderSerializer

        return OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(
            data=request.data,
            context={
                "user_id": request.user.id,
            },
        )

        serializer.is_valid(raise_exception=True)

        order = serializer.save()

        output_serializer = OrderSerializer(order)

        return Response(
            output_serializer.data,
            status=status.HTTP_201_CREATED,
        )

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Order.objects.all()

        customer = get_object_or_404(
            Customer,
            user_id=user.id,
        )

        return Order.objects.filter(
            customer_id=customer.id
        )