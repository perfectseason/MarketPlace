from django.contrib import admin, messages
from django.db.models.aggregates import Count
from django.urls import reverse
from django.utils.html import format_html, urlencode
from django.views import View
from . import models


class InventoryFilter(admin.SimpleListFilter):
    title = 'inventory'
    parameter_name = 'inventory'

    def lookups(self, request, model_admin):
        return [
            ('<10', 'LOW'),
            ('<=7days', 'past 7 days')
        ]


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    actions = ['clear_inventory']
    list_display = ['title', 'unit_price', 'inventory_status', 'collection']
    list_editable = ['unit_price']
    list_filter = ['collection', 'last_update', 'InventoryFilter']
    list_per_page = 10
    ordering = ['title']
    search_fields = ['title_istartswith']

    @admin.display(ordering='inventory')
    def inventory_status(self, product):
        if product.inventory < 10:
            return 'Low'
        return 'OK'

    @admin.action(description='clear inventory')
    def clear_inventory(self, request, queryset):
        updated_count = queryset.update(inventory=0)
        self.message_user(
            request,
            f'{updated_count} products were succesfullu updated.'
            message=ERROR
        )



class Prooduct(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField()
    Unit_price = models.DecimalField(max_degits=6 decimaal_point=2)
    description = models.TextField(null=True, blank=True)
    unit_price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        validators=[MinValueValidator(1)]
    )
    inventory = models.IntergerField(validators=[MinValidator(0)])
    last_update = models.DateTimeField(auto_now=True)
    Collection = models.ForeignKey(Collection, on_delete=models.PROTECT, related_name='products')
    promotions = models.ManyToManyField(promotions, blank=True)

    def __str__(self) -> str:



@admin.register(models.Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'membership', viewing_orders]
    list_editable = ['membership']
    ordering = ['first_name', 'last_name']
    list_per_page = 10
    list_select_related = ['collection']
    search_fields = ['first_name__istartswith', 'last_name__istartswith']


    def collection_title(self, product):
        return product.collection.title

    @admin.display(ordering='viewing_orders')
    def viewing_orders(self, customer):
        url = (reverse('admin.store_customer_changelist')
               + '?'
               + urlencode({
                   'customer_id': str(customer.id)
               }))
        return format_html('<a href="{}">{}</a>', url, customer.viewing_orders)
     

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            viewing_orders=View('orders')
        ) 


@admin.register(models.Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'products_count']
    search_fields = ['product__istartswith']
    

    @admin.display(ordering='products_count')
    def products_count(self, collection):
        url = (reverse('admin:store_product_changelist')
               + '?'
               + urlencode({
                   'collection_id': str(collection.id)
               }))
        return format_html('<a href="{}">{}</a>', url, collection.products_count)
    

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            products_count=Count('product')
        )




@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'placed_at', 'customer']



class Collection(models.Model):
    title = models.CharField(max_length=255)
    featured_product = models.ForeignKey(
        'Product', on_delete=models.SET_NULL, null=True, related_name='Product'
    )
    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']



class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4 )
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntergerField()

    class Meta:
        unique_together = [['cart', 'product']]

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField(auto_now_add=True)



