from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.contenttypes.admin import GenericTabularInline

from store.admin import ProductAdmin
from store.models import Product
from tags.models import TaggedItem

from .models import User

from .models import Cart, CartItem



@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "password1",
                    "password2",
                    "email",
                    "first_name",
                    "last_name",
                ),
            },
        ),
    )


class TagInline(GenericTabularInline):
    autocomplete_fields = ["tag"]
    model = TaggedItem


class CustomProductAdmin(ProductAdmin):
    inlines = [TagInline]


admin.site.unregister(Product)



admin.site.register(Product, CustomProductAdmin)





# Cart

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "user",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "user__email",
        "user__username",
    ]


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "cart",
        "product",
        "quantity",
    ]

    search_fields = [
        "product__name",
        "cart__user__email",
    ]



# Form Equiry

from django.contrib import admin
from .models import PropertyEnquiry


@admin.register(PropertyEnquiry)
class PropertyEnquiryAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "property",
        "name",
        "email",
        "phone",
        "status",
        "created_at",
    ]

    list_filter = [
        "status",
        "created_at",
    ]

    search_fields = [
        "name",
        "email",
        "phone",
    ]

    list_editable = [
        "status",
    ]



# ChatBot

from django.contrib import admin
from .models import Conversation, ChatMessage


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "user",
        "session_id",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "session_id",
        "user__email",
    ]


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "conversation",
        "role",
        "created_at",
    ]

    list_filter = [
        "role",
        "created_at",
    ]

    search_fields = [
        "message",
    ]


