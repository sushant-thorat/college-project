class paymentModel {
  constructor(payment) {
    this.user_id = payment.user_id;
    this.property_id = payment.property_id;
    this.amount_paid = payment.amount_paid;
    this.payment_method = payment.payment_method;
    this.payment_details = payment.payment_details;
    this.status = payment.status;
  }
}

export default paymentModel;
