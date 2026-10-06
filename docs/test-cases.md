# Test Cases

Automated tests carry the same ID in their title, so each row here traces to a test.

## Login
| ID | Title | Steps | Expected result | Priority |
|---|---|---|---|---|
| TC-LOGIN-01 | Valid login | Enter `standard_user` / valid password → Login | Redirected to inventory page | High |
| TC-LOGIN-02 | Locked-out user | Enter `locked_out_user` / valid password → Login | Error "locked out" shown, stays on login | High |
| TC-LOGIN-03 | Wrong password | Enter valid user / wrong password → Login | Error "do not match" shown | High |
| TC-LOGIN-04 | Empty username | Leave username empty → Login | "Username is required" | Medium |
| TC-LOGIN-05 | Empty password | Leave password empty → Login | "Password is required" | Medium |
| TC-LOGIN-06 | Direct URL without login | Open `/inventory.html` while logged out | Login page with error shown | High |

## Inventory
| ID | Title | Steps | Expected result | Priority |
|---|---|---|---|---|
| TC-INV-01 | Product count | Log in | 6 products displayed | Medium |
| TC-INV-02 | Sort price low→high | Choose "Price (low to high)" | Prices ascending | Medium |
| TC-INV-03 | Sort price high→low | Choose "Price (high to low)" | Prices descending | Medium |
| TC-INV-04 | Sort name Z→A | Choose "Name (Z to A)" | Names in reverse alphabetical order | Low |

## Cart
| ID | Title | Steps | Expected result | Priority |
|---|---|---|---|---|
| TC-CART-01 | Add items | Add Backpack, then Bike Light | Badge shows 1, then 2 | High |
| TC-CART-02 | Remove item | Add Backpack → Remove | Badge disappears | Medium |
| TC-CART-03 | Persistence | Add Backpack → reload → open cart | Backpack still in cart | Medium |

## Checkout
| ID | Title | Steps | Expected result | Priority |
|---|---|---|---|---|
| TC-CHK-01 | Full purchase | Add 2 items → cart → checkout → fill info → finish | Item total = sum of prices; "Thank you for your order" | Critical |
| TC-CHK-02 | Missing first name | Checkout with empty first name | "First Name is required" | Medium |
| TC-CHK-03 | Missing postal code | Checkout with empty postal code | "Postal Code is required" | Medium |

## API (JSONPlaceholder)
| ID | Title | Request | Expected result | Priority |
|---|---|---|---|---|
| TC-API-01 | Get one post | `GET /posts/1` | 200, id=1, title & body are strings | High |
| TC-API-02 | List posts | `GET /posts` | 200, array of 100 | Medium |
| TC-API-03 | Filter by user | `GET /posts?userId=1` | All items have userId=1 | Medium |
| TC-API-04 | Create post | `POST /posts` with JSON | 201, echoes payload + id | High |
| TC-API-05 | Not found | `GET /posts/99999` | 404 | Medium |
