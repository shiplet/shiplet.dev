---
title: "Core Rust Features for Non-Rustaceans"
author: "Shiplet"
date: "2021-01-01"
host: "https://shiplet.dev"
description: "A quick overview of Rust's unique features"
imgUrl: "https://shiplet.dev/static/triangle.png"
fbUrl: "https://shiplet.dev/post/thouhts-on-ikenfell"
twDomain: "shiplet.dev"
---

This is a quick overview of some unique Rust features: things you'll find in Rust that you won't readily find in other popular languages. If you're familiar with Javascript, I think of this list as being analogous to a list of JS things like hoisting, prototypes, and the event loop. It's a living document, so if sections are missing, incomplete, or empty, that will change in the future!

## Ownership
- at any given point, a piece of data can have either, *but not both*, of the following: one mutable reference, or any number of immutable references
- references must always be valid

## Smart Pointers
- Smart Pointers are pointers with metadata and methods
- They abstract a lot of the more granular aspects of memory managment and mutability into their internal structure and public API
- The most common smart pointers:
    - `String` - closely related to `str`, but `String` owns the contents of the string and provides an API for mutating its internal state
    - `Vec<T>` - a vector of a single type that can grow in size
    - `Box<T>` - enables heap allocation
    - `Rc<T>` - enables multiple ownership via reference counting in single-threaded applications
    - `Ref<T>` - enforces borrowing rules at runtime rather than at compile time, which enables interior mutability of immutable entities
- Smart Pointers own they data the point to, but can also allow it to be used as a reference
- Implement `Deref` and `Drop` traits
- `Deref`
    - allows the smart pointer to be used like a reference
- `Drop`
    - allows you to customize what happens when a smart pointer goes out of scope
- deref coercion
    - a convenience feature that allows coercion between references to types with analogous trait implementations
    - applies in 3 instances
        - `From &T to &U when T: Deref<Target=U>`
            - coerces a reference of type `T` to a reference of type `U` when type `T` implements `Deref` such that it targets (or `return`s) a value of type `U`
        - `From &mut T to &mut U when T: DerefMut<Target=U>`
            - same as above, but with mutability
        - `From &mut T to &U when T: Deref<Target=U>`
            - can only coerce a mutable type into an immutable type, because in going from immutable to mutable, Rust is unable to guarantee that the mutable reference is the *only* such reference to that chunk of data.
    - Example: `&String` and `&str` can be used interchangeably

## Pattern Matching
- forthcoming

## Traits
- Traits are encapsulated behavioral abstractions that can be shared across an arbitrary number of discrete types
    - which is a fancy way of saying that several types can have similar behaviors if they implement the signature required by the Trait
    - `Copy` is a Trait shared by primitive data types, like `i32` and `bool`, and it refers to the behavioral ability to share data values rather than data references or pointers
- Trait Objects
    - ```rust
        pub struct Screen {
            pub components: Vec<Box<dyn Draw>>,
        }
      ```
    - `Box<dyn Draw>` is the Trait Object. It refers to any type inside a Box, as long as that type implements the `Draw` trait.
    - the `dyn` is the piece, or the Trait feature, that indicates this is a Trait Object and that there is an expected abstraction of behavior in the `Draw` trait, which every entity that encounters it must implement.
    - Rust deliberately avoids refering to things as "objects" the way that other languages do. Structs and Enums are the primary object-like entities, but they differ because they separate data and behavior, whereas object-oriented or class-based languages will combine data and behavior in the same object.
    - Trait Objects combine data and behavior, but you can't _add_ data to a trait object: they allow an abstraction in behavior across several types.

## Objects
- As indicated above, Rust deliberately avoids referring to things as objects, because it doesn't explicitly combine data and behavior the way an object oriented or class-based language might. Structs and Enums can have data-based definitions with `impl` blocks appended after-the-fact, but the explicit separation of data and behavior means they're not strictly "objects" in the OOP sense.
- structs
    - related data of distinct types
    - similar to JS notion of an object, but data and behavior are separated by a discrete `impl` block (referring to "implementation") where methods or associated functions get defined
    - methods: take `&self` or `&mut self` as their first parameter - conceptually similar to a class method
    - associated functions: conceptually similar to `static` functions on a class, as in they don't depend on the struct being initialized or having access to internal state
- enums
    - a single abstract concept and its enumerated variants
        - `IPv4` and `IPv6` are both enum variants of the parent type of `IP`, so even though they're different at the granular level: one is v4 and the other v6; they can both be used when data of type `IP` is required.

## Lifetimes
- forthcoming

## Explicit Reference Counting Types
- For data with multiple owners, Rust provides types that explicitly indicate multiple ownership
    - `Rc` and `Arc`, or `reference counted` and `atomic reference counted` types, respectively
        - `Rc` is for use in single-threaded applications
        - `Arc` is for use in multi-threaded applications
- These types conventionally use `Rc::clone` or `Arc::clone` when "cloning" references to the data, because their associated functions merely increment the reference count, rather than deep cloning the data.
- This is a helpful convention when cloning other types via the deep clone method, or `pieceOfData.clone()`.

## Interior Mutability
- encapsulates unsafe code used to mutate owned data 