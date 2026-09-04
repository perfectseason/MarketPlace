from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Cart, CartItem
from .serializers import CartSerializer

from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import PropertyEnquiry
from .serializers import PropertyEnquirySerializer

from rest_framework.response import Response

from .models import Conversation, ChatMessage


# Cart
class CartView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        cart, created = Cart.objects.get_or_create(
            user=request.user
        )

        serializer = CartSerializer(cart)

        return Response(serializer.data)


class CartItemCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        product_id = request.data.get("product")
        quantity = request.data.get("quantity", 1)

        cart, created = Cart.objects.get_or_create(
            user=request.user
        )

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product_id=product_id,
        )

        if created:
            item.quantity = quantity
        else:
            item.quantity += quantity

        item.save()

        serializer = CartSerializer(cart)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )



form / Enquiry


class PropertyEnquiryCreateView(
    generics.CreateAPIView
):

    queryset = PropertyEnquiry.objects.all()

    serializer_class = PropertyEnquirySerializer

    permission_classes = [
        AllowAny
    ]

    def perform_create(self, serializer):

        customer = (
            self.request.user
            if self.request.user.is_authenticated
            else None
        )

        serializer.save(
            customer=customer
        )


# ChatBot
class ChatMessageView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        message = request.data.get("message")
        session_id = request.data.get("session_id")

        conversation, created = (
            Conversation.objects.get_or_create(
                session_id=session_id
            )
        )

        ChatMessage.objects.create(
            conversation=conversation,
            role="user",
            message=message,
        )

        # Replace this with your real AI service
        ai_response = get_ai_response(message)

        ChatMessage.objects.create(
            conversation=conversation,
            role="assistant",
            message=ai_response,
        )

        return Response({
            "conversation_id": conversation.id,
            "message": ai_response,
        })

    