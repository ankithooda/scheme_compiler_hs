#lang racket

; Rectangle Interface
; All segments are to be given in clockwise fashion
(define (make-rectangle point-list)
  (list s1 s2 s3 s4)
  )

; Segment Interface

(define (midpoint-segment s)
  (make-point (/ (+ (x-point (start-segment s)) (x-point (end-segment s))) 2)
              (/ (+ (y-point (start-segment s)) (y-point (end-segment s))) 2)
              ))

(define (make-segment s1 s2)
  (cons s1 s2))

(define (start-segment s)
  (car s))

(define (end-segment s)
  (cdr s))

(define (print-segment p)
  (newline)
  (display "[")
  (print-point (start-segment p))
  (display " , ")
  (print-point (end-segment p))
  (display "]"))

; Points Interface

(define (make-point x y)
  (cons x y))

(define (x-point p)
  (car p))

(define (y-point p)
  (cdr p))

(define (print-point p)
  (display "(")
  (display (x-point p))
  (display ",")
  (display (y-point p))
  (display ")"))


              