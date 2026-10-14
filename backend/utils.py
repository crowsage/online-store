from constants import DELIVERY_CHARGE, FREE_DELIVERY_ABOVE


def calculate_delivery_charge(subtotal):
    if FREE_DELIVERY_ABOVE is not None and subtotal >= FREE_DELIVERY_ABOVE:
        return 0
    return DELIVERY_CHARGE
