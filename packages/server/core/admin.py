from itertools import product

from django.contrib import admin
from django.contrb.contenttypes.admin import GenericTabularInline
from store.admin import ProductAdmin
from tags.models import TaggedItem

# Register your models here.
class TagInline(GenericTabularInline):
    autocomplete_fields = ['tag']
    model = TaggedItem



class CustomProductAdmin(ProductAdmin):
    inlines = [TagInline]


admin.site.unregister(product)
admin.site.register(product, CustomProductAdmin)