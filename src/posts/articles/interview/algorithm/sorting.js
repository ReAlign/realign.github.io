var testArr = [2, 1, 5, 3, 4];

function xBubble(a) {
    var len = a.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
    }

    return a;
}

function xSelect(a) {
    var minIndex;
    var len = a.length;
    for (var i = 0; i < len; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (a[j] < a[minIndex]) {
                minIndex = j;
            }
        }
        [a[minIndex], a[i]] = [a[i], a[minIndex]];
    }

    return a;
}

function xInsert(a) {
    for (var i = 1; i < a.length; i++) {
        for (var j = i; j > 0; j--) {
            if (a[j] < a[j - 1]) {
                [a[j], a[j - 1]] = [a[j - 1], a[j]];
            } else {
                break;
            }
        }
    }
    return a;
}

function xQuick(a) {
    if (a.length <= 1) {
        return a; //递归出口
    }
    let left = [];
    let right = [];
    let pivot = a[0];

    for (var i = 1; i < a.length; i++) {
        a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
    }

    return xQuick(left).concat(pivot, xQuick(right));
}