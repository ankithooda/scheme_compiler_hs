function pair(a, b) {
    return [a, b];
}

function first(a) {
    return a[0];
}

function rest(a) {
    return a[1];
}

function delay(exp) {
    return function() {
        return exp();
    }
}

// function delay(exp) {
//     if (typeof exp === "function") {
//         return function() {
//             return exp();
//         }
//     } else {
//         return function() {
//             return exp;
//         }
//     }
// }

function force(promise) {
    return promise();
}

function stream_pair(a, b) {
    // every call of stream pair wrap the cdr argument in a zero argument function.
    return pair(a, delay(b));
}

function stream_first(stream) {
    return first(stream);
}

function stream_rest(stream) {
    return force(rest(stream));
}

function empty_stream() {
    return [];
}

function is_stream_empty(stream) {
    return !stream || stream.length === 0;
}

function stream_map_len(proc, len, stream) {
    if (is_stream_empty(stream)) {
        return empty_stream;
    } else {
        if (len != 0) {
            return stream_pair(
                proc(first(stream)),
                 //except here we are not wrapping second arg to stream_pair.
                 // dont know why
                stream_map_len(proc, len - 1, stream_rest(stream))
            );
        }
    }
}

function stream_combination(proc, stream_1, stream_2) {
    if (is_stream_empty(stream_1) || is_stream_empty(stream_2)) {
        return empty_stream;
    } else {
        return stream_pair(
            proc(stream_first(stream_1), stream_first(stream_2)),
            function() {
                return stream_combination(
                    proc,
                    stream_rest(stream_1), 
                    stream_rest(stream_2)
                )
            }

        );
    }

}

//////////////////////////
function fibgen(a, b) {
    // fibgen was being called before calling stream_pair, wrapping it in function
    // seems to avoid it.

    // It is avoided because the only way to delay immediate evaluation
    // is to explicitly wrap the call in a zero arg function.
    // This is the only way to do this without changing the eval
    // order of function arguments in in Javascript.

    // This will not work.
    // return stream_pair(a, fibgen(b, (a + b)));
    return stream_pair(a, function() {return fibgen(b, (a + b))});
}

a = fibgen(0, 1);
//////////////////////

function int_stream_gen(a) {
    return stream_pair(a, function() {return int_stream_gen(a)});
}

ones = int_stream_gen(1);
twos = int_stream_gen(2);
threes = stream_combination(function(a,b) {return a + b}, ones, twos);

// Iterate over first ten elements.
stream_map_len(
    function(x) {console.log(x);},
    10,
    threes
);




