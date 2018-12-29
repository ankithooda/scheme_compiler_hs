#lang racket

; Rational Number package primitives

(define (make-rat x y)
  (let ((g (gcd x y)))
    (cons (/ x g) (/ y g))))

(define (add-rat x y)
  (make-rat (+ (* (numer x) (denom y) (* (numer y) (denom x))))
            (* (denom x) (denom x))
            ))
   
(define (sub-rat x y)
  (make-rat (- (* (numer x) (denom y) (* (numer y) (denom x))))
            (* (denom x) (denom x))
            ))

(define (mul-rat x y)
  (make-rat (* (numer x) (numer y))
            (* (denom x) (denom y))
            ))

(define (div-rat x y)
  (make-rat (* (numer x) (denom y))
            (* (denom x) (numer y))
            ))

(define (eq-rat? x y)
  (= (* (numer x) (denom y))
     (* (denom x) (numer y))))

(define (print-rat x)
  (newline)
  (display (numer x))
  (display "/")
  (display (denom x)))


; Rational number as scheme primitives

(define (numer x)
  (car x))

(define (denom x)
  (cdr x))

; Utils
(define (gcd x y)
  (if (= y 0)
      x
      (gcd y (remainder x y))))