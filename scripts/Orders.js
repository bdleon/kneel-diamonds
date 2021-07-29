
import { getCustomOrders, getMetals, getSizes, getStyles } from "./database.js"

const metals = getMetals()
const sizes = getSizes()
const styles = getStyles()



const buildOrderListItem = (order) => {

    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId
        }
    )
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )
    const totalCost = foundMetal.price + foundStyle.price + foundSize.price
    
    const costString = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })
    

    return `<li>
        Order #${order.id} cost ${costString} was placed on ${order.timestamp}
    </li>`
}

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getCustomOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}
