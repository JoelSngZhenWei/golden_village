"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    CreditCard,
    Home,
    Plus,
    ShoppingBag,
    Store,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Hardcoded user data
const userData = {
    name: "Matthew Chang",
    email: "matthewchange@goldenvillagefans.com",
    phone: "+65 1234 4567",
}

// Hardcoded snack items with proper image paths
const snackItems = [
    {
        id: "popcorn-large",
        name: "Popcorn - Large",
        price: 9.99,
        quantity: 1,
        image: "/food/popcorn_large.png",
    },
    {
        id: "soda-medium",
        name: "Soda - Medium",
        price: 4.99,
        quantity: 2,
        image: "/food/cola.png",
    },
    {
        id: "candy-mm",
        name: "Candy - M&Ms",
        price: 4.49,
        quantity: 1,
        image: "/food/mnms.png",
    },
]

// Saved payment methods
const savedPaymentMethods = [
    {
        id: "mastercard-3997",
        type: "mastercard",
        label: "Mastercard",
        last4: "3997",
        expiry: "09/26",
        isDefault: true,
        icon: "/paymentoptions/mastercard.png",
    },
    {
        id: "grabpay",
        type: "grabpay",
        label: "GrabPay Wallet",
        last4: "",
        expiry: "",
        isDefault: false,
        icon: "/paymentoptions/grabpay.png",
    },
    {
        id: "applepay",
        type: "applepay",
        label: "Apple Pay",
        last4: "",
        expiry: "",
        isDefault: false,
        icon: "/paymentoptions/applepay3.png",
    },
]

const DeliveryConfirmation = () => {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false)
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [showAllPaymentMethods, setShowAllPaymentMethods] = useState(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("mastercard-3997")

    console.log(isProcessing)
    // Calculate totals
    const subtotal = snackItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const tax = subtotal * 0.07 // 7% tax
    const totalPrice = subtotal + tax
    const totalItems = snackItems.reduce((total, item) => total + item.quantity, 0)

    const handleContinue = () => {
        if (step < 5) {
            setStep(step + 1)
        }

        // Simulate payment processing on the final step
        if (step === 3) {
            setIsProcessing(true)
            setTimeout(() => {
                setIsProcessing(false)
                setStep(4)
            }, 1500)
        }
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
        } else {
            router.back()
        }
    }

    const handleFinish = () => {
        router.push("/home")
    }

    const togglePaymentMethods = () => {
        setShowAllPaymentMethods(!showAllPaymentMethods)
    }

    // Get the selected payment method details
    const selectedMethod = savedPaymentMethods.find((method) => method.id === selectedPaymentMethod)
    console.log(selectedMethod)

    return (
        <div className="container max-w-md mx-auto px-4 pt-4 pb-20 min-h-[80vh]">
            {/* progress indicator */}
            <div className="mb-6">
                <div className="flex justify-between">
                    {["Details", "Review", "Payment", "Summary", "Complete"].map((label, index) => (
                        <div
                            key={label}
                            className={`text-xs font-medium ${step > index + 1 ? "text-primary-foreground" : step === index + 1 ? "text-accent" : "text-primary-foreground"}`}
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* order info card */}
            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Your Snack Order</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                        <ShoppingBag className="h-3 w-3" /> {totalItems} items
                    </CardDescription>
                    <CardDescription className="flex items-center gap-1">
                        <Store className="h-3 w-3" /> Golden Village Plaza
                    </CardDescription>
                    <CardDescription className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Estimated pickup: 15 minutes
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="min-h-[65vh] flex flex-col justify-between border rounded-lg border-muted-foreground pt-4">
                {/* Step 1: Personal Details */}
                {step === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <span className="">Confirm details</span>
                            </CardTitle>
                            <CardDescription>We&apos;ll use these details for your order</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs">
                                    Full Name
                                </Label>
                                <Input id="name" defaultValue={userData.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs">
                                    Email Address
                                </Label>
                                <Input id="email" type="email" defaultValue={userData.email} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-xs">
                                    Phone Number
                                </Label>
                                <Input id="phone" defaultValue={userData.phone} />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                )}

                {/* Step 2: Order Review */}
                {step === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Review Your Order</CardTitle>
                            <CardDescription>Check your items before proceeding to payment</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {snackItems.map((item) => (
                                    <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                                        <div className="w-16 h-16 relative rounded-md overflow-hidden">
                                            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <span className="font-medium">{item.name}</span>
                                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                                <span>Quantity: {item.quantity}</span>
                                                <span>${item.price.toFixed(2)} each</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span>Tax (7%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                                        <span>Total</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                )}

                {/* Step 3: Payment Details */}
                {step === 3 && (
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Payment Details</CardTitle>
                            <CardDescription className="text-xs">
                                Secure payment powered by Stripe payment services.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Payment Method Selection */}
                            <div className="border rounded-lg p-2">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Payment Method</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={togglePaymentMethods}>
                                        See All
                                        {showAllPaymentMethods ? (
                                            <ChevronUp className="ml-1 h-3 w-3" />
                                        ) : (
                                            <ChevronDown className="ml-1 h-3 w-3" />
                                        )}
                                    </Button>
                                </div>

                                {!showAllPaymentMethods ? (
                                    <div className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-6 relative">
                                                <Image
                                                    src={savedPaymentMethods[0].icon || "/placeholder.svg"}
                                                    alt="Mastercard"
                                                    width={40}
                                                    height={24}
                                                    className="object-fill"
                                                />
                                            </div>
                                            <span className="text-sm">Mastercard •••• 3997</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">Default</span>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <RadioGroup defaultValue="mastercard-3997" onValueChange={setSelectedPaymentMethod}>
                                            {savedPaymentMethods.map((method) => (
                                                <div
                                                    key={method.id}
                                                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary/30"
                                                >
                                                    <RadioGroupItem value={method.id} id={method.id} />
                                                    <Label
                                                        htmlFor={method.id}
                                                        className="flex flex-1 items-center justify-between cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-10 h-6 relative">
                                                                <Image
                                                                    src={method.icon || "/placeholder.svg"}
                                                                    alt={method.label}
                                                                    fill
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                            <span className="text-sm">
                                                                {method.label}
                                                                {method.last4 && <span> •••• {method.last4}</span>}
                                                            </span>
                                                        </div>
                                                        {method.isDefault && <span className="text-xs text-muted-foreground">Default</span>}
                                                    </Label>
                                                </div>
                                            ))}

                                            {/* Add New Payment Method */}
                                            <div className="mt-2 pt-2 border-t">
                                                <Button variant="ghost" className="w-full justify-start text-sm">
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add Payment Method
                                                </Button>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <Separator />
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span>Tax (7%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <Separator className="my-1" />
                                    <div className="flex justify-between font-medium text-sm">
                                        <span>Total</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={termsAccepted}
                                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                                />
                                <div className="grid gap-0.5 leading-none">
                                    <label
                                        htmlFor="terms"
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Accept terms and conditions
                                    </label>
                                    <p className="text-xs text-muted-foreground">
                                        By checking this box, you agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                )}

                {/* Step 4: Summary */}
                {step === 4 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                            <CardDescription>Your transaction was successful</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="rounded-lg text-center">
                                <Check className="h-8 w-8 mx-auto mb-2 text-accent" />
                                <h3 className="font-medium">Payment Confirmed</h3>
                                <p className="text-sm text-muted-foreground">Order ID: #ORD78912345</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Store className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Pickup Location</span>
                                    </div>
                                    <span className="text-sm">Golden Village Plaza</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Estimated Pickup</span>
                                    </div>
                                    <span className="text-sm">15 minutes</span>
                                </div>

                                {/* Display items with images */}
                                <div className="mt-4 pt-2 border-t">
                                    <h4 className="text-sm font-medium mb-2">Order Items</h4>
                                    <div className="space-y-3">
                                        {snackItems.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3">
                                                <div className="w-10 h-10 relative rounded-md overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.image || "/placeholder.svg"}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 flex justify-between items-center">
                                                    <span className="text-sm">
                                                        {item.name} x{item.quantity}
                                                    </span>
                                                    <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Payment Method</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-4 relative">
                                            <Image
                                                src={savedPaymentMethods[0].icon || "/placeholder.svg"}
                                                alt="Mastercard"
                                                width={24}
                                                height={16}
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="text-sm">•••• 3997</span>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center font-medium">
                                    <span>Total Paid</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleContinue} className="w-full">
                                View Receipt
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                {/* Step 5: Receipt */}
                {step === 5 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Receipt</CardTitle>
                            <CardDescription>A copy has been sent to your email</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-secondary p-4 rounded-lg space-y-3">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold">Order #ORD78912345</h3>
                                        <p className="text-sm text-muted-foreground">Golden Village Plaza</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
                                        <p className="text-sm text-muted-foreground">{new Date().toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <Separator />

                                {/* Display items with images */}
                                <div className="space-y-3">
                                    {snackItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                                                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 flex justify-between items-center">
                                                <span className="text-sm">
                                                    {item.name} x{item.quantity}
                                                </span>
                                                <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-2 border-t border-dashed">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-medium mt-1">
                                        <span>Total</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-2 pt-2 border-t border-dashed flex justify-center">
                                    <div className="bg-secondary p-3 rounded">
                                        {/* This would be a QR code in a real app */}
                                        <div className="w-42 h-42 bg-primary flex items-center justify-center text-primary-foreground text-xs">
                                            <Image src="/frame.png" alt="Mastercard" width={130} height={130} className="object-contain" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-sm text-muted-foreground">
                                <p>A confirmation has been sent to {userData.email}</p>
                                <p>Please scan this QR or your account GV bar code when collecting your order from GV-Bot.</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2"></CardFooter>
                    </Card>
                )}

                {/* Navigation buttons */}
                <div className="flex flex-row justify-between px-6 py-4">
                    <div>
                        <Button
                            className="mb-4 flex items-center gap-2 font-medium"
                            variant="outline"
                            onClick={handleBack}
                            disabled={step === 5}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </div>

                    {/* Only show Download Receipt button at the final stage */}
                    {step === 5 ? (
                        <Button variant="outline" className="">
                            Download
                        </Button>
                    ) : (
                        <div></div> // Empty div to maintain layout
                    )}

                    <div>
                        <Button
                            className="mb-4 flex items-center gap-2 font-medium"
                            onClick={step === 5 ? handleFinish : handleContinue}
                            disabled={step === 3 && !termsAccepted}
                            variant='gv'
                        >
                            {step === 5 ? (
                                <>
                                    Home
                                    <Home className="h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryConfirmation

