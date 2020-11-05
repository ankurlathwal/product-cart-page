const lib = require ('./promos');



describe("Apply discount", () => {
    test("total price of cart items should reduce after applying promo code", () => {
        const promo = mockData.promoCodes[0]; // 10% reduction
        const cartItems = mockData.cartItems[0];
        const totalPrice = 199.99*cartItems.quantity;
        const output = 199.99*cartItems.quantity - ((199.99*cartItems.quantity)*(mockData.promoCodes[0].value/100));

        expect(lib.applyDiscountPromo(promo, totalPrice, cartItems)).toEqual(output);
    })
})

describe("Apply price reduction", ()=>{
    test("if 10 items are there and promo is applied, price of each should reduce to 8.99", ()=>{
        const promo = mockData.promoCodes[2]; // docgen reduces to 8.99 if 10 items
        const cartItems = mockData.cartItems;
        const totalPrice = 9.99*cartItems.quantity;
        const output = [
            {
                "id": "wf",
                "name": "Workflow",
                "price": 199.99
              },
              {
                  "id": "docgen",
                  "name": "Document Generation",
                  "price": 9.99,
                  "reducedPrice": 8.99
              },
              {
                  "id": "form",
                  "name": "Form",
                  "price": 99.99
              }
        ];
        expect(lib.applyReductionPromo(promo, totalPrice, cartItems, mockData.allProducts)).toEqual(output);

    })
})

const mockData = {
    cartItems: [
        {
            "id": "wf",
            "quantity": 6
        },
        {
            "id": "docgen",
            "qunatity": 10
        }
    ],
    allProducts: [
        {
            "id": "wf",
            "name": "Workflow",
            "price": 199.99
          },
          {
              "id": "docgen",
              "name": "Document Generation",
              "price": 9.99
          },
          {
              "id": "form",
              "name": "Form",
              "price": 99.99
          }
    ],

    promoCodes: [
        {
            "code": "RRD4D32",
            "type": "discount", // discount or reduction in a single item price
            "unit": "percent", // flat (e.g. $300) or percent (e.g. 15%)
            "value": 10,
            "minCost": 1000,
            "eligibleProducts": [
              "all"
            ]
          },
          {
            "code": "44F4T11",
            "type": "discount", // discount or reduction in a single item price
            "unit": "percent", // flat (e.g. $300) or percent (e.g. 15%)
            "value": 15,
            "minCost": 1500,
            "minQuantity": 0,
            "eligibleProducts": [
              "all"
            ]
          },
          {
            "code": "FF9543D1",
            "type": "reduction", // discount or reduction in a single item price
            "unit": "reducedPrice", // flat (e.g. $300), percent (e.g. 15%) or reduced price
            "value": 8.99,
            "minCost": 0,
            "minQuantity": 10,
            "eligibleProducts": [
              "docgen"
            ]
          },
          {
            "code": "YYGWKJD",
            "type": "reduction", // discount or reduction in a single item price
            "unit": "reducedPrice", // flat (e.g. $300), percent (e.g. 15%) or reduced price
            "value": 89.99,
            "minCost": 0,
            "minQuantity": 1,
            "eligibleProducts": [
              "form"
            ]
          }
    ]
}