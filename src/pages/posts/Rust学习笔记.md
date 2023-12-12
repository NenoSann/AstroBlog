---
layout: "../../layouts/BlogBaseLayout.astro"
title: "Rust语言特性"
summary: "记录一下在Rust学习中遇到的新奇的语言特性，也作为学习的一个小小记录"
---

## 通用编程概念

### 变量和可变性

#### 不可变的'变量'

在传统的编程语言中变量(Variable)是可变的，但是在 Rust 中默认情况下变量是**不可变的**(immutable)。在定义变量时候如果需要将变量声明为可变的需要增加 mut 关键字。

```Rust
    // This code does not compile
    fn main() {
        let x = 5;
        println!("The value of x is : {}",x);
        // invalid!
        x = 6;
        let mut y = 5;
        println!("The value of y is: {}",y)
        // valid
        y = 6;
        println!("The next value of y is: {}",y)
    }
```

#### 同一作用域下的变量遮蔽

在 Rust 中同一作用域内可以存在两个同名的变量，而在 Javascript 中这会造成编译错误。Javascript 仅允许不同作用域下的变量遮蔽。
可以变量遮蔽的好处是可以不用为了声明作用相近但是类型不同的不同变量，例如我们可以不用 user_str 和 user_id 来表示两个不同的用户名称，可以避免起名字的纠结。

```Rust
    fn main() {
        let x = 5;
        let x = x + 1;
        {
            let x = x * 2;
            // will be 12
            pritnln!("x in the inner scope: {}",x);
        }
        pritnln!("x in the outer scope: {}",x);
        // will be 6
    }
```

### 控制流

#### Loop 代码循环

在 Rust 中可以使用 Loop 来进行代码循环。它可以在为循环指定一个循环标签（Loop label），然后可以将标签和 break 或者 continue 一起使用，使得这些关键字作用于标记的循环上。
控制标签使用'加上一个名称组成，可以做到打断外层循环。

```Rust
fn main() {
    let mut count = 0;
    //
    'counting_up: loop {
        println!("count = {}", count);
        let mut remaining = 10;

        loop {
            println!("remaining = {}", remaining);
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {}", count);
}

```

在 Loop 中，我们还可以在 break 语句后面加上表达式来返回一个数值，例如：

```Rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    println!("The result is {}", result);
}
```

在这里在 loop break 后会带上 counter\*2 的数值，可以将其赋值给变量。

## 所有权

### 所有权的概念

所有权的规则必须谨记：

- Rust 中的每个值都有一个称为**所有者**(owner)的变量
- 值在任一时刻有且只有一个所有者
- 当所有者离开作用域(scope)的时候，这个值将会被丢弃

**移动还是复制？**

**移动**

```Rust
    let s1 = String::from("Hello, World!");
    let s2 = s1;
    // invalid, cuz s1 does not have the ownership of string
    println!("{}",s1);
```

在上面这个例子中，我们创建了一个 String 并且将他的所有权交给了 s1，随后又将所有权转交给了 s2，此时 Rust 会禁止我们再访问 s1。因此对于 String 的操作在 Rust 内称为**移动**(move)而不是**浅拷贝**(shalow copy)。

**But why?**

这是因为 Rust 在设计上为了避免内存的**二次释放**(double free)错误，不允许两个变量指向同个引用。同时 Rust 也永远不会创建数据的**深拷贝**(deep copy)。

**克隆**

如果我们确实需要进行数据的深拷贝，我们可以调用一个叫做 clone 的通用函数。

```Rust
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {},s2 = {}",s1,s2);
```

这样 s1 和 s2 都拥有相同的 String 内容。

**拷贝-只在栈上**
Rust 有一个叫做 Copy trait 的特殊标注，可以用在类似整型这样的存储在栈上的类型上。如果一个类型实现了 Copy trait，那么一个旧的变量在将其赋值给其他变量后仍然可用。Rust 不允许自身或其任何部分实现了 Drop trait 的类型使用 Copy trait。

```Rust
fn main() {
    let x = 5;
    let y = x;

    println!("x = {}, y = {}", x, y);
}
```

作为一个通用的规则，任何一组简单标量值的组合都可以实现 Copy，任何不需要分配内存或某种形式资源的类型都可以实现 Copy，以下举例：

- 所有的整数类型，例如 u32
- 布尔类型
- 所有的浮点类型，例如 f64
- 字符类型 char
- 元组，当它的包含项也全都实现了 Copy 的时候

### 引用与借用

#### 引用

当我们在将参数传递给函数时，由于所有权的关系当函数作用域结束时所有权会被释放，导致参数丧失所有权，这不是我们想要的。如果我们的函数只是想获得变量的数值但是不获取所有权，我们可以使用**借用**(borrowing)

```Rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

```

'&'代表参数接收一个引用，它允许我们使用值但是不获得所有权。同样的，在 Rust 哲学中，引用是默认无法修改的，如果我们需要对引用进行修改的话我们需要使用可变引用。

#### 可变引用

如果我们需要在函数内使用并且修改参数，那么我们需要将引用声明为可变引用。  
'& mut'代表的是可变引用，这时候我们就能修改引用。  
**drawback**  
可变引用有一个很大的限制，在同一时间内同一个数据只能有一个可变引用。尝试创建两个可变引用会失败。

```Rust
// this code will not compile
fn main() {
    let mut s = String::from("hello");

    let r1 = &mut s;
    let r2 = &mut s;

    println!("{}, {}", r1, r2);
}

```

同时，我们也不能够同时拥有不可变引用和可变引用，因为这可能会使得使用者使用的值被其他代码修改。

## 枚举&模式匹配

### match 模式匹配

Rust 中的 match 类似于之前语言的 switch case 语句，但是通过编辑器检查，能够确保所有可能情况都得到处理。

```Rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}


```

每个分支的关联代码是一个表达式，表达式的结果值将作为整个 match 表达式的返回值。值得一提的是 match 强制我们匹配所有可能的结果，如果没有穷举所有的可能性编译将不能通过。我们也可以使用'\_'符号来代表没有穷举的剩余分支。
