"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import {
    Calendar,
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    CreditCard,
    Home,
    Plus,
    Popcorn,
    Ticket,
    Users,
} from "lucide-react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Checkbox } from "./ui/checkbox"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

// Hardcoded user data
const userData = {
    name: "Matthew Chang",
    email: "matthewchange@goldenvillagefans.com",
    phone: "+65 1234 4567",
}

// Hardcoded deals
const deals = [
    { id: "popcorn", name: "Popcorn & Drink Combo", price: 8.99, description: "Large popcorn and a regular soda" },
    { id: "nachos", name: "Nachos Special", price: 7.49, description: "Nachos with cheese dip and a regular soda" },
    { id: "candy", name: "Candy Bundle", price: 5.99, description: "Choose any 2 candy items" },
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
interface PurchaseConfirmationProps {
    movieTitle?: string,
}
const PurchaseConfirmation = ({ movieTitle = "Snow White" }: PurchaseConfirmationProps) => {
    // Movie data with title from props
    const movie = {
        title: movieTitle,
        image: "/placeholder.svg?height=400&width=300",
        date: "Friday, June 14, 2024",
        time: "7:30 PM",
        outlet: "GV Plaza Singapure",
        cinema: "Hall 8",
        seats: ["F12", "F13"],
        price: 12.99,
        link: "snow-white",
    }
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false)
    // const [paymentMethod, setPaymentMethod] = useState("credit-card")
    const [selectedDeals, setSelectedDeals] = useState<string[]>([])
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [showAllPaymentMethods, setShowAllPaymentMethods] = useState(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("mastercard-3997")

    const totalTicketPrice = movie.price * movie.seats.length
    const totalDealsPrice = selectedDeals.reduce((total, dealId) => {
        const deal = deals.find((d) => d.id === dealId)
        return total + (deal?.price || 0)
    }, 0)
    const totalPrice = totalTicketPrice + totalDealsPrice

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

    const handleDealToggle = (dealId: string) => {
        setSelectedDeals((prev) => (prev.includes(dealId) ? prev.filter((id) => id !== dealId) : [...prev, dealId]))
    }

    const handleFinish = () => {
        router.push("/home")
    }

    const togglePaymentMethods = () => {
        setShowAllPaymentMethods(!showAllPaymentMethods)
    }

    // Get the selected payment method details
    const selectedMethod = savedPaymentMethods.find((method) => method.id === selectedPaymentMethod)

    console.log(selectedMethod, isProcessing)

    return (
        <div className=" container max-w-md mx-auto px-4 pt-4 pb-20 min-h-[80vh]">
            {/* progress indicator */}
            <div className="mb-6">
                <div className="flex justify-between">
                    {["Details", "Deals", "Payment", "Summary", "Complete"].map((label, index) => (
                        <div
                            key={label}
                            className={`text-xs font-medium ${step > index + 1 ? "text-red" : step === index + 1 ? "text-accent" : "text-primary-foreground/80"}`}
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* movie info card */}
            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{movie.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {movie.date}
                    </CardDescription>
                    <CardDescription className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {movie.time} • {movie.outlet} • {movie.cinema}
                    </CardDescription>
                    <CardDescription className="flex items-center gap-1">
                        <Ticket className="h-3 w-3" /> {movie.seats.join(", ")} ({movie.seats.length} tickets)
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className=" min-h-[65vh] flex flex-col justify-between border rounded-lg border-muted-foreground pt-4">
                {/* Step 1: Personal Details */}
                {step === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <span className="">Confirm details</span>
                            </CardTitle>
                            <CardDescription></CardDescription>
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

                {/* Step 2: Online Deals */}
                {step === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Refreshments</CardTitle>
                            <CardDescription>Enhance your movie experience with these special deals</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {deals.map((deal) => (
                                    <div
                                        key={deal.id}
                                        className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/10 transition-colors"
                                    >
                                        <Checkbox
                                            id={deal.id}
                                            checked={selectedDeals.includes(deal.id)}
                                            onCheckedChange={() => handleDealToggle(deal.id)}
                                        />
                                        <div className="flex-1">
                                            <Label htmlFor={deal.id} className="text-base font-medium flex justify-between cursor-pointer">
                                                {deal.name}
                                                <span>${deal.price.toFixed(2)}</span>
                                            </Label>
                                            <p className="text-sm text-muted-foreground mt-1">{deal.description}</p>
                                        </div>
                                    </div>
                                ))}
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
                            <CardDescription className="text-xs">Secure payment powered by Stripe payment services.</CardDescription>
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
                                                <Image src="/paymentoptions/mastercard.png" alt="Mastercard" fill className="object-contain" />
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
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start text-sm"
                                                >
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
                                        <span>Tickets ({movie.seats.length})</span>
                                        <span>${totalTicketPrice.toFixed(2)}</span>
                                    </div>
                                    {selectedDeals.length > 0 && (
                                        <>
                                            {selectedDeals.map((dealId) => {
                                                const deal = deals.find((d) => d.id === dealId)
                                                return (
                                                    <div key={dealId} className="flex justify-between text-xs">
                                                        <span>{deal?.name}</span>
                                                        <span>${deal?.price.toFixed(2)}</span>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    )}
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
                            <CardTitle>Purchase Summary</CardTitle>
                            <CardDescription>Your transaction was successful</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="rounded-lg text-center">
                                <Check className="h-8 w-8  mx-auto mb-2 text-accent" />
                                <h3 className="font-medium ">Payment Confirmed</h3>
                                <p className="text-sm text-muted-foreground">Transaction ID: #TRX78912345</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Date & Time</span>
                                    </div>
                                    <span className="text-sm">
                                        {movie.date}, {movie.time}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Location</span>
                                    </div>
                                    <span className="text-sm">
                                        {movie.outlet}, {movie.cinema}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Ticket className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Tickets</span>
                                    </div>
                                    <span className="text-sm">{movie.seats.join(", ")}</span>
                                </div>
                                {selectedDeals.length > 0 && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Popcorn className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Refreshments</span>
                                        </div>
                                        <span className="text-sm">{selectedDeals.length} items</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Payment Method</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-4 relative">
                                            <Image src="/paymentoptions/mastercard.png" alt="Mastercard" fill className="object-contain" />
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
                                View E-Tickets
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                {/* Step 5: Success */}
                {step === 5 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Your E-Tickets</CardTitle>
                            <CardDescription>Your tickets have been sent to your email</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-secondary p-4 rounded-lg space-y-3">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold">{movie.title}</h3>
                                        <p className="text-sm text-muted-foreground">{movie.cinema}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{movie.date}</p>
                                        <p className="text-sm text-muted-foreground">{movie.time}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        <span className="text-sm">Seats</span>
                                    </div>
                                    <span className="text-sm font-medium">{movie.seats.join(", ")}</span>
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
                                <p>Please show this QR or your account GV bar code when collecting your order</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2"></CardFooter>
                    </Card>
                )}

                {/* Navigation buttonsa */}
                <div className="flex flex-row justify-between px-6 py-4">
                    <div>
                        <Button
                            className="mb-4 flex items-center gap-2 font-medium"
                            variant="gv_outline"
                            onClick={handleBack}
                            disabled={step === 5}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </div>

                    {/* Only show Download Tickets button at the final stage */}
                    {step === 5 ? (
                        <Button variant="outline" className="">
                            Download
                        </Button>
                    ) : (
                        <div></div> // Empty div to maintain layout
                    )}

                    <div>
                        <Button
                            className="mb-4 flex items-center gap-2 font-medium bg-accent text-primary"
                            variant="gv"
                            onClick={step === 5 ? handleFinish : handleContinue}
                        >
                            {step === 5 ? (
                                <>
                                    Home
                                    <Home />
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

export default PurchaseConfirmation

