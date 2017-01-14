# Rust-inspired Option type

## Basic Usage

The following examples will outline the many ways in which you can use the Option type.
I have attached **opinionated** annotations using the `AMAZING`, `Ok`, `Compiles`, and `Lazy`
keywords. These should help identify preferred usage / approach.

### Using `Some`

```javascript
let x: Option<Function> = new Some(() => null); // AMAZING
let x: Some<Function> = new Some(() => null); // Ok
let x = new Some<Function>(() => null); // Compiles
let x = new Some(true); // Lazy
let x = new Some(typeof 42); // Lazy
let x = new Some(7); // Lazy
let x: Option<number> = new Some(7); // AMAZING
let x: Some<string[]> = new Some(["a", "b"]); // Ok
let x = new Some([1, 2, 3]); // Lazy
let x: Some<Object> = new Some({}); // Ok

let x: Option<boolean>; // AMAZING
x = new Some(false);

let x: Some<boolean>; // Ok
x = new Some(false);

let x = new Some(undefined); // Error: Argument of type 'undefined' is not assignable to parameter of type 'SomeType'.
let x = new Some(null); // Error: Argument of type 'null' is not assignable to parameter of type 'SomeType'.

function getValueByIndex(arr:string[], index:number):Option<string> { // AMAZING
    return new Some(arr[index]);
}
```

### Using `None`

```javascript
let x = new None(); // Ok
let x = new None("Value"); // Error: Supplied parameters do not match any signature of call target.

let x: Option<string>; // AMAZING
x = new None<string>();

let x: None<string>; // Ok
x = new None<string>();
```

### Using `Option`

```javascript
function getOption():Option<string> { // AMAZING
    if (condition == true) {
        return new Some("Something");
    } else {
        return new None;
    }
}
```

### Unwrapping `Some` and `None`

To access any value in a `Some` or a `None`, we have to **safely "unwrap"** it.

#### Using `unwrap_or()` (AMAZING)

```javascript
const
    a = new Some<string>("a"),
    b = new None<string>();

let x:string, y:number;

x = a.unwrap_or("b"); // Ok
x = a.unwrap_or(1); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.

y = b.unwrap_or(42); // Ok
y = b.unwrap_or("Something Else"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

#### Using `unwrap()` (Ok)

Because with `unwrap()` we don't explicitly provide any "fallback" value, we have to check if a `Some`
is indeed `Some` (e.g. it contains a value):

```javascript
function get_something_upper(val:Some<string>):string {
    let x:string;

    if (is_some(val)) {
        x = val.unwrap();
    } else {
        x = "Something Else";
    }

    return x.toUpperCase();
}
```

### Unwrapping `Option`

#### Using `unwrap_or()` (AMAZING)

```javascript
function get_str(opt:Option<string>):string {
    let x:string;
    x = opt.unwrap_or("b");
    return x;
}
```

#### Using `unwrap()` (Ok)

```javascript
function get_str(opt:Option<string>):string {
    let x:string;

    if (is_some(opt)) {
        x = opt.unwrap();
    } else {
        x = "Default String";
    }

    return x;
}
```

If you want to use `unwrap()` without the enforced `is_some()` check, you can extend your expected return
type with `undefined`:

```javascript
const a: Option<string> = new Some(arr_of_strings[index_out_of_bound]);

let y:string|undefined = a.unwrap(); // Compiles + Lazy
let x:string = a.unwrap(); // Error: Type 'string | undefined' is not assignable to type 'string'.
```
