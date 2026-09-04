from rest_framework import serializers
from .models import Cart, CartItem

from .models import PropertyEnquiry

from .models import Conversation, ChatMessage



from djoser.serializers import (
    UserCreateSerializer as BaseUserCreateSerializer,
    UserSerializer as BaseUserSerializer,
)


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = [
            "id",
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
        ]

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
        ]



# Cart
class CartItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    product_image = serializers.ImageField(
        source="product.image",
        read_only=True
    )

    price = serializers.DecimalField(
        source="product.price",
        max_digits=12,
        decimal_places=2,
        read_only=True
    )

    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            "id",
            "product",
            "product_name",
            "product_image",
            "price",
            "quantity",
            "subtotal",
        ]

    def get_subtotal(self, obj):
        return obj.product.price * obj.quantity


class CartSerializer(serializers.ModelSerializer):

    items = CartItemSerializer(
        many=True,
        read_only=True
    )

    total_items = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            "id",
            "items",
            "total_items",
            "total_price",
        ]

    def get_total_items(self, obj):
        return sum(
            item.quantity
            for item in obj.items.all()
        )

    def get_total_price(self, obj):
        return sum(
            item.product.price * item.quantity
            for item in obj.items.all()
        )
    



# Form / Enquiry

class PropertyEnquirySerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = PropertyEnquiry

        fields = [
            "id",
            "property",
            "name",
            "email",
            "phone",
            "message",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "status",
            "created_at",
        ]


ChatBot

class ChatMessageSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = ChatMessage

        fields = [
            "id",
            "role",
            "message",
            "created_at",
        ]


class ConversationSerializer(
    serializers.ModelSerializer
):

    messages = ChatMessageSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Conversation

        fields = [
            "id",
            "session_id",
            "messages",
            "created_at",
            "updated_at",
        ]

