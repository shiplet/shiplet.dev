---
title: "Core Rust Features for Non-Rustaceans"
author: "Shiplet"
date: "2021-01-01"
host: "https://shiplet.dev"
description: "A quick overview of Rust's unique features"
imgUrl: "https://shiplet.dev/static/triangle.png"
fbUrl: "https://shiplet.dev/post/core-rust-features-for-non-rustaceans"
twDomain: "shiplet.dev"
---

This is a quick overview of some unique Rust features. If you're familiar with Javascript, I think of this list as being analogous to a list of JS things like hoisting, prototypes, and the event loop. It's a living document, so if sections are missing, incomplete, or empty, that will change in the future!

## Types
- Strict, static typing system
- dynamically sized types, like strings or vecs, expose a pointer to the data and its length. This allows Rust to standardize the size of such variables - all variables of a single type must occupy the same amount of space in memory. When the variable is a length value and a pointer to the address in memory where a string begins, then technically that variable is the size of two `usize` values (length, pointer), rather than the size of the string it's pointing to.
    - this behavior is common to all dynamically sized types
    - remember, all unsized or dynamic types MUST be behind some kind of pointer
- Tuple struct (or newtype?) initializers look like function calls, for example: `Millimeter(5)`
    - these initializers are actually implemeted as functions that return an instance of the type constructed from its arguments
    - this means the initializer functions can be used as function pointers that implement closure traits, allowing them to be used in function signatures that accept closures

## Associated Types
This example is borrowed from the Rust Reference, with commentary.

The reference definition of associated types uses extremly precise language, which can often sacrifice clarity for brevity. Why use 100 words when 1 previously defined piece of jargon or domain lingo can do the trick? Well, this is my attempt at unzipping that 1 previously defined piece of domain lingo into the 100 words that make most sense to me... at least at the time of writing.

Associated types are placeholder types defined on traits, which allow for generalization of types passed to trait implementations. In other words - as you're designing a trait that performs some general task, and you want to ensure that something implementing your trait maintains a consistent type over the course of a series of functions required by your trait, then you define an associated type, like `type E;` below. Because this is an abstract, unknown type, you're enabling a future program to implement this trait such that `E` could be a primitive like `i32` or `bool`, something more complex, perhaps a custom type `Daemon` or `Process`, or a generic like `T`.

See the example below for a minimal implementation.

```rust
trait Container {
    type E;
    fn empty() -> Self;
    fn insert(&mut self, elem: Self::E);
}

impl<T> Container for Vec<T> {
    type E = T;
    fn empty() -> Vec<T> { Vec::new() }
    fn insert(&mut self, x: T) { self.push(x); }
}
```

The `associated type` is defined on the trait itself as `type E;`. This tells the rust compiler that any type that implements `Container` must also implement a definition for `E`.

The trait implementation below provides the `associated type definition`. This is the part where the associated type receives its definition, in this case the generic type `T`. In this case, the placeholder has been filled by a generic rather than a concrete type.

## Ownership
- at any given point, a piece of data can have either, *but not both*, of the following: one mutable reference, or any number of immutable references
- references must always be valid

## Return Values
- To return a value out of a Rust function, you omit the `;` semicolon on the final line of the function
- If the final line of the function contains a semicolon, it implicitly returns nothing, and the return type is `()`, canonically known as the `unit type`. It has only one value, `()`.

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
    - in order to use traits as trait objects, they MUST go behind a pointer, like `Box` or `Rc`/`Arc`. This is because traits are also dynamically sized.
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

------


## Rust's unsafe features are meant to empower and enable...
Working with Rust means the compiler is inherently conservative. It'll forbid some valid programs if it means it never allows an invalid program. But, there are some things we, as programmers, can know that the compiler can't know. For example - taking mutable references from two distinct halves of the same vector. Rust doesn't _know_ they're distinct halves, it just knows you're trying to take two mutable references, which breaks one the borrow checker's rules. Fortunately, Rust has an alter-ego - *UNSAFE RUST*. Unsafe Rust lets you do the following:

- Dereference raw pointers
- Call unsafe functions or methods
- Access or modifying static mutable variables
- Implement unsafe traits
- Access fields on unions

## Rust's safety features are meant to prevent or impede...
 Rust's guarantees around safety exist in order to mitigate the effects of Undefined Behavior. Think of the MISSINGNO Pokemon - an excellent example from 2020's RustConf - which is the result of a set of deterministic undefined behaviors. Rust wants to avoid things like that. Here's how it does it. (This is drawn / copied from the [Rustnomicon](https://doc.rust-lang.org/nomicon/what-unsafe-does.html)).

 Rust's syntax and quirks are designed to prevent the following:
 - dereferencing dangling or unaligned pointers
    - a pointer/reference is dangling if it's null or if some of its bytes are part of a different allocation
 - breaking pointer aliasing rules
    - a pointer cannot outlive its reference
    - a mutable reference cannot be aliased
 - calling a function with the wrong call application binary interface (ABI) or unwinding from a function with the wrong unwind ABI
 - causing a data race
    - two or more threads concurrently accessing a location of memory
    - one or more of them is a write
    - one or more of them is unsynchronized
 - executing code compiled with target features that the current thread context does not support
    - an attribute applied to an unsafe function, which refers to a feature present in the system's chip architecture
 - producing invalid values
    - a bool that isn't 1 or 0
    - an enum with an invalid discriminant
    - a null fn pointer
    - a char outside ranges `[0x0, 0xD7FF]` and `[0x0, 0x10FFFF]`
    - a ! (never type?)
    - an integer, floating point value, or raw pointer read from uninitialized memory, or uninitialized memory in a str
        - uninitialized memory being basically a jangled mess of bits that may or may not refer to or form a valid piece of data
    - a reference/Box that is dangling, unaligned, or points to an invalid value
    - a wide reference, Box, or raw pointer with invalid metadata:
        - a `dyn Trait` that's not a pointer to a matching vtable (the table of functions for the trait) for the dynamic trait `Trait`
        - slice length has to be a valid usize, or else the metadata is invalid
    - a type with custom invalid values that is one of those values
        - for example, a `NonNull` that is `null`




