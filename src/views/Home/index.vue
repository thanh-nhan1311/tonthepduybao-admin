<template>
  <section>
    <analysis />

    <!-- <div class="flex items-center space-x-8 mt-10">
      <a-button type="primary" @click="saveDebt()">Save Debt</a-button>
      <a-button type="primary" danger @click="saveDebt(true)">Delete & Save Debt</a-button>
    </div>

    <div class="flex items-center space-x-8 mt-10">
      <a-button type="primary" @click="saveProduct()">Save Product</a-button>
      <a-button type="primary" danger @click="saveProduct(true)">Delete & Save Product</a-button>
    </div> -->
  </section>
</template>

<script setup>
import { CHIEU_DAI, DO_DAY, SUPPLIER } from './database';
import debtData from './debt.json';
import productData from './product.json';


const debtStore = useDebtStore()
const productStore = useProductStore()

const saveDebt = async (isDelete = false) => {
  const type = 'IRON'
  const branchId = 1

  // map data
  const convertData = debtData.map((item, index) => {
    try {
      if (!item.quantity || !item.date || !item.height || !item.tttb || !item.kg) return null

      const date = item.date.replace(/-/g, '')
      const height = Number(item.height.toString().replace(',', '.'))
      const tttb = Number(item.tttb.toString().replace(',', '.'))

      const quantity = Number(item.quantity.toString().replace(',', '.'))
      const kg = Number(item.kg.toString().replace(',', '.'))
      const unitPrice = Number(item.unitPrice.toString().replace(',', '.'))
      const totalUnitPrice = Number(item.totalUnitPrice.toString().replace(',', '.'))
      const totalPrice = Number(item.totalPrice.toString().replace(',', '.'))

      if (isNaN(kg) || isNaN(unitPrice) || isNaN(totalUnitPrice) || isNaN(totalPrice) || isNaN(quantity)) return null

      const _height = DO_DAY.find(dd => dd.name.toLowerCase().includes(height))
      const _width = CHIEU_DAI.find(cd => cd.name.toLowerCase().includes(item.width))
      const _supplier = SUPPLIER.find(item => item.name.toLowerCase().includes(debtData[0].supplier.toLowerCase()))

      if (_supplier)
        return { ...item, date, height, tttb, kg, unitPrice, totalUnitPrice, totalPrice, quantity, _height, _width, _supplier }

      return null
    } catch (error) {
      console.log(index);
    }
  }).filter(item => !!item)

  const uniqueDates = new Set(convertData.map(item => item.date))
  const debtObj = {}
  uniqueDates.forEach(uDate => {
    const debtValue = convertData.filter(item => item.date === uDate)



    const debtDetailItems = debtValue.map(item => {
      const properties = {}
      if (item._height) properties[6] = item._height.id
      if (item._width) properties[8] = item._width.id
      
      return {
        name: item.name,
        weight: item.kg,
        quantity: item.quantity,
        avgProportion: item.tttb,
        unitPrice: item.unitPrice,
        totalUnitPrice: item.totalUnitPrice,
        totalPrice: item.totalPrice,
        branch: branchId,
        properties
      }
    })

    const debtForm = {
      id: `${debtValue[0]._supplier.id}_${uDate}`,
      date: uDate,
      propertyIds: [6, 8],
      type,
      customerId: debtValue[0]._supplier.id,
      items: debtDetailItems
    }

    debtObj[uDate] = debtForm
  })

  const debts = Object.values(debtObj)
  for (let i = 0; i < debts.length; i++) {
    const debtItem = debts[i]

    if (isDelete) {
      try {
        await debtStore.delete(debtItem.id)
        console.log(`Delete OK ==> ${i} - ${debtItem.date}`);
      } catch (error) {
        console.log(`Delete FAILED ==> ${i} - ${debtItem.date}`);
      }
    }

    try {
      await debtStore.create(debtItem)
      console.log(`Save OK ==> ${i} - ${debtItem.date}`);
    } catch (error) {
      console.log(`Save FAILED ==> ${i} - ${debtItem.date}`, debtItem);
    }
  }
}

const saveProduct = async (isDelete = false) => {
  if (isDelete) {
    try {
      await productStore.deleteAll()
      console.log(`Delete OK`);
    } catch (error) {
      console.log(`Delete FAILED`);
    }
  }

  const products = Object.values(productData)

  for (let i = 0; i < products.length; i++) {
    const product = products[i]

    for (let pi = 0; pi < product.items.length; pi++) {
      const piItem = product.items[pi]

      const arr = []
      if (piItem[129]) arr.push({ pId: 129, pQuantity: piItem[129] })
      if (piItem[130]) arr.push({ pId: 130, pQuantity: piItem[130] })
      if (piItem[133]) arr.push({ pId: 133, pQuantity: piItem[133] })
      if (piItem[134]) arr.push({ pId: 134, pQuantity: piItem[134] })

      for (let ai = 0; ai < arr.length; ai++) {
        const arrItem = arr[ai]
        try {
          await productStore.create({
            name: piItem.name.trim(),
            type: 'STEEL',
            properties: {
              12: 107,
              16: arrItem.pId
            },
            date: '20240219',
            branch: product.branchId,
            quantity: arrItem.pQuantity,
          })

          console.log(`Save OK ==> ${piItem.name.trim()}`);
        } catch (error) {
          console.log(`Save FAILED ==> ${piItem.name.trim()}`);
        }
      }
    }
  }
}
</script>

<script>
import { defineComponent } from 'vue';
import { useDebtStore } from '~/stores/debt';
import { useProductStore } from '~/stores/product';
import Analysis from './Analysis/index.vue';

export default defineComponent({
  components: {
    Analysis
  }
})
</script>
