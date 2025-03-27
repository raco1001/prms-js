export function toShow(node) {
  node.className = node.className.replace('v-none', 'v-show')
}

export function toHidden(node) {
  node.className = node.className.replace('v-show', 'v-none')
}

export function validatePrice(currentFunds, currentAmount) {
  // TODO: 금액이 현재 자산보다 이하인지
  return currentFunds >= currentAmount
}

export function validateRequired({ category, description, price }) {
  // TODO: 모든 필수 필드가 유효한 값을 가지고 있는지
  return (
    Boolean(category) && Boolean(description) && Boolean(price) && price > 0
  )
}
