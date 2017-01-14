# Rust-inspired Result type

## Basic Usage

The following examples will outline the many ways in which you can use the Result type.
I have attached **opinionated** annotations using the `AMAZING`, `Ok`, `Compiles`, and `Lazy`
keywords. These should help identify preferred usage / approach.

### Using `Ok`

```javascript
let x:Result<string, string> = new Ok("str"); // AMAZING
let x:Ok<string> = new Ok("str"); // Ok
let x = new Ok<string>("str"); // Compiles
let x = new Ok("str"); // Lazy

let x: Result<string, string>; // AMAZING
x = new Ok("ok str");

let x: Result<string, string>; // AMAZING
x = new Err("err str");

let x: Result<string, number>; // AMAZING
x = new Err(1);

let x: Ok<string>; // Ok
x = new Ok("str");

let x: Result<string, number>;
x = new Err("Error Message"); // Error: Type 'Err<string>' is not assignable to type 'Result<string, number>'.

let x = new Ok(undefined); // Error: Argument of type 'undefined' is not assignable to parameter of type 'SomeType'.
let x = new Err(undefined); // Error: Argument of type 'undefined' is not assignable to parameter of type 'SomeType'.
let x = new Ok(null); // Ok
let x = new Err(null); // Ok
let x = new Err(new ReferenceError("Error Message")); // Ok

function getResult():Result<string, string> { // AMAZING
    let x;
    
    if () {
        x = new Ok("Everything fine");
    } else {
        x = new Err("There was an error");
    }
    
    return x;
}
```

### Using `Err`

