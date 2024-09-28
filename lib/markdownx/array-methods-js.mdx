---
title: "Built-in array methods in JavaScript"
description: "Explain what is web development by using" // ask chat GPT
createdAt: "2024-02-01"
topic: "WEB_DEVELOPMENT"
subTopic: null
author: "Ghislain Genay"
updatedAt: "2023-07-28"
readTime: "2 min read"
keywords: []
tags: ["web-development","javascript"]
language: "en"
level: "BEGINNER"
series: "JAVASCRIPT"
series_num: 1
---

My purpose for this article is to give you a complete example using all the built-in methods in Javascript using a simple concert booking system.

<div class='md-alert'>The data was reduced to the maximum in order to give you a simpler explanation.</div>

## 1. The Data

Each concert booking data contains:

<ul>
<li>👉 <b>username</b> : <em>name of the user</em></li>
<li>👉 <b>isMember</b> : <em>if user have a membership in our website</em></li>
<li>👉 <b>numberOfTickets</b>: <em>number of ticket purchased</li></em>
<li>👉 <b>unitPrice</b>: <em></em>the unit price of the concert ticket</em></li>
</ul>

<u>Some important information to keep it for later:</u>

<ul>
<li>⚠ The <b>number of ticket purchased</b> is limited to if user have a membership card</li>
<li>⚠ The <b>number of ticket purchased</b> is limited to 5 if the user have a membership card</li>
</ul>

Let's see the array of data:

```js
const bookings = [
	{
		user: 'emma',
		numberTickets: 2,
		ticketPrice: 12,
		isMember: true
	},
	{
		user: 'logan',
		numberTickets: 4,
		ticketPrice: 10,
		isMember: false
	},
	{
		user: 'edgar',
		numberTicket: 2,
		ticketPrice: 12,
		isMember: false
	},
	{
		user: 'matt',
		numberTicket: 2,
		ticketPrice: 14,
		isMember: true
	}
];
```

## 2. Error in the bookings

It seems to have some errors during the booking process.

Some people were allowed to buy more tickets that they could. Let's recover only the correct bookings.

For this system, we will need to check if the user have a membershipor not and check the number of ticket based on these requirements.
We will use the booking <code style='color: var(--bg-clr); background-color: var(--text-clr);'>isValidBooking</code> just specified below

```js
const isValidBooking = (booking) => {
	const { numberTicket, isMember } = booking;
	const limitTicket = isMember ? 5 : 3; // if member set to 5, else set 3
	const haveTooManyTickets = numberTicket > limitTicket;
	const haveValidTickets = !haveTooManyTickets; // valid booking is having the opposite of having too many tickets
	return haveValidTickets;
};
```

For details, isValidBooking can be reduced to fewer lines

```js
const isValidBooking = ({ numberTicket, isMember }) => {
	const limitTicket = isMember ? 5 : 3;
	return numberTicket < limitTicket;
};
// In one line
const isValidBooking = ({ numberTicket, isMember }) => numberTicket < (isMember ? 5 : 3);
```

```js
const correctBookings = bookings.filter((booking) => isValidBooking(booking));
// OR
const correctBookings = bookings.filter(isValidBooking);
// because the function already take one booking as parameter
```

As you saw in the previous data, logan purchased 4 tickets even though it is not a member.

The booking company will cancel his tickets for now until the problem is resolved via the customer service.

```js
// Booking removed from listing
const removedFromBookingList = {
	user: 'logan',
	numberTickets: 4,
	ticketPrice: 10,
	isMember: false
};
```

<span class='md-callout'>Array(length: n1) -> FILTER -> Array(length: n2 <= n1)</span>

## 3. Membership

Actually, Matt already bought 100 tickets since he registered to the website. 😄

Thank to the membership website system, he can get this booking for free.
He can have free ticket but it needs to be a member.</p>

```js
const mattBooking = bookings.find((booking) => booking.username === 'matt');
const mattBooking = bookings.find(({ username }) => username === 'matt');

//Returned object
let mattBooking = {
	user: 'matt',
	numberTicket: 2,
	ticketPrice: 14,
	isMember: true
};
```

Matt have a membership so we can directly send him an email and proceed to a reimbursement of the ticket. 💸

<span class='md-callout'>Array(length: n1) -> FIND -> Element of array or undefined (if not found)</p>

In <code class='md-code'>Array.find()</code>, the value is one element of the array if it matches the find function <code class='md-code'>booking.username === 'matt'</code>

```js
// New data for Matt

const mattNewBooking = {
	user: 'matt',
	numberTicket: 2,
	ticketPrice: 0,
	isMember: true
};
```

## 4.Total pricing

Now that all the data are in order, the company would like to have the total price based on the number of tickets and the price.

```js
const bookingsWithTotalPrice = bookings.map((booking) => ({
	...booking,
	totalPrice: booking.numberTicket * booking.ticketPrice
}));
```

<span class='md-callout callout-orange'>Array(length: n1) -> MAP -> Array(length: n2 = n1)</span>

We finally want to check how much did we received in terms of money using the totalPrice.

We use <code class='md-code'>.reduce()</code> to sum out all the totalPrice (from bookingsWithTotalPrice) by setting the initial value to 0.

```js
const totalAmount = bookingsWithTotalPrice.reduce(
	(acc, currentBooking) => acc + currentBooking.totalPrice,
	0
);
```

For all the booking in the array, it will only add the value that you specified()

<span class='md-callout'>Array(length: n1) -> REDUCE -> Object/Number/String</span>

## 5. Advanced Array.reduce() techniques

Before finishing this study, I would like to give more details about <code class='md-code'>Array.reduce()</code> to group element into an object (Array to Object).

For example, we just want an object with keys as isMember (true as 1 and false as 0) and an array of username
We can use < array.reduce() > on bookingsWithTotalPrice or bookings

For this example, we need to set the initial value to an object <code class='md-code'>{}</code>, not a number or empty string

```js
// I destructure booking using only isMember and username
const membershipList = bookings.reduce((acc, { isMember, username }) => {
	const value = isMember ? 1 : 0
	if (!acc[value]) acc[value] = [username]
	else acc[value].push(username)
	return acc
}, {})

// Results
{
	0: ['edgar'],
	1: ['emma', 'matt']
}
```

Here was some examples in a real-world like situation where you can use differents methods based on the outcome that you are searching for.

Hope this post was useful for you and it was a blast creating it.

See you next time.
<br />

<br/>
<span class='md-callout'>Be Redi to code! 💻</span>
