const initializePayment = async () => {
   setIsLoading(true);

   try {
      const response = await paymentService.initialize({
         order_id: order.id,
      });

      window.location.href = response.data.authorization_url;
   } catch (error) {
      setError('Unable to initialize payment.');
   } finally {
      setIsLoading(false);
   }
};
