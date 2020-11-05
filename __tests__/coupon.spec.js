describe("Coupon Function", () => {
    test("it should apply coupon", () => {
        const input = 2;
        const output = 4;

        expect(couponFunc(input)).toEqual(output);
    })
})

function couponFunc(input){
    
    return input*2;
}