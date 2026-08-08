from itertools import product
from store.models import Product, Collection
from decimal import Decimal
from rest_framework import serializers


class CollectionSerializer(serializer.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=255)




class ProductSerializer(serializers.Serializer):
    id = serializers.IntergerField()
    title = serializers.CharField(max_length=255)
    price = serializers.DecimalField(max_digits=6, decimal_places=2, source='unit_price')
    price_with_tax = serializers.SerializerMethodField(mathod_name='calculate_tax')
    collection = serializers.PrimaryKeyRelatedField(
        queryset=Collection.objects.all()
    )


    def calculate_tax(self, product: Product):
        return product.unit_price * Decimal(1.1)




class CartSeralizer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'items']