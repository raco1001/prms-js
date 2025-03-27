/**
 * dateList {
    date: new Date("2000-01-10").toLocaleDateString(),
    id: "2",
  }[]
 * detailList {
    2: {
       id: Date.now() + 1000,
       createAt: new Date(),
       description: "삼겹살",
       category: "식사",
       amount: 20000,
       fundsAtTheTime: 9978000,
     }[]
  }
 */
export const store = {
  currentFunds: 0,

  isFirstEdit: true,
  todayId: 1,

  dateList: [
    {
      id: 1,
      date: new Date().toLocaleDateString(),
    },
  ],
  detailList: {},
}

export function updateStorage() {
  sessionStorage.setItem('store', JSON.stringify(store))
}

export function initStore() {
  const storage = sessionStorage.getItem('store')
  if (!storage) updateStorage()

  const { dateList, detailList, todayId, currentFunds, isFirstEdit } =
    JSON.parse(storage)

  store.currentFunds = currentFunds
  store.isFirstEdit = isFirstEdit
  store.dateList = dateList
  store.detailList = detailList
  store.todayId = todayId
}

export function addNewHistory(newHistory) {
  try {
    if (!store.detailList[store.todayId]) {
      store.detailList[store.todayId] = []
    }
    store.detailList[store.todayId].push(newHistory)

    store.currentFunds -= newHistory.amount

    updateStorage()
    return true
  } catch (error) {
    alert(error)
    return false
  }
}

export function removeHistory(dateId, itemId) {
  try {
    if (!store.detailList[dateId]) return false

    // Find the item first to get its amount
    const itemToRemove = store.detailList[dateId].find(
      (item) => item.id === Number(itemId),
    )
    if (!itemToRemove) return false

    store.currentFunds += itemToRemove.amount

    store.detailList[dateId] = store.detailList[dateId].filter(
      (item) => item.id !== Number(itemId),
    )

    if (store.detailList[dateId].length === 0) {
      delete store.detailList[dateId]
    }

    updateStorage()
    return true
  } catch (error) {
    alert(error)
    return false
  }
}
