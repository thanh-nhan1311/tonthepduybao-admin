<template>
  <section>
    <analysis />

    <!-- <div class="flex items-center space-x-8 mt-10">
      <a-button type="primary" @click="saveDebt()">Save Debt</a-button>
      <a-button type="primary" danger @click="saveDebt(true)">Delete & Save Debt</a-button>
    </div>

    <div class="flex items-center space-x-8 mt-10">
      <a-button type="primary" @click="saveProduct('ALL', false)">Save Product</a-button>
      <a-button type="primary" danger @click="saveProduct('ALL', true)">Delete & Save Product</a-button>
    </div>

    <div class="flex items-center space-x-8 mt-10">
      <a-button type="primary" @click="saveProduct('STEEL', false)">Save Steel Product</a-button>
      <a-button type="primary" danger @click="saveProduct('STEEL', true)">Delete & Save Steel Product</a-button>
    </div> -->
  </section>
</template>

<script setup>
import { useDebtStore } from '~/stores/debt';
import { useProductStore } from '~/stores/product';
import { CHIEU_DAI, DO_DAY, SUPPLIER } from './data/database';
import debtData from './data/debt.json';
import { getScrewProducts } from './data/productScrew';
import { getSteelProducts } from './data/productSteel';


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
      if (import.meta.env && import.meta.env.MODE === 'development') console.log(index);
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
        if (import.meta.env && import.meta.env.MODE === 'development') console.log(`Delete OK ==> ${i} - ${debtItem.date}`);
      } catch (error) {
        if (import.meta.env && import.meta.env.MODE === 'development') console.log(`Delete FAILED ==> ${i} - ${debtItem.date}`);
      }
    }

    try {
      await debtStore.create(debtItem)
      if (import.meta.env && import.meta.env.MODE === 'development') console.log(`Save OK ==> ${i} - ${debtItem.date}`);
    } catch (error) {
      if (import.meta.env && import.meta.env.MODE === 'development') console.log(`Save FAILED ==> ${i} - ${debtItem.date}`, debtItem);
    }
  }
}

const saveProduct = async (type = 'ALL', isDelete = false) => {
  if (isDelete) {
    try {
      await productStore.deleteAll({ type })
      console.log(`Delete OK`);
    } catch (error) {
      console.log(`Delete FAILED`);
    }
  }

  let products = []
  const steelProducts = getSteelProducts()
  const screwProducts = getScrewProducts()

  if (type === 'ALL') products = [...steelProducts, ...screwProducts]
  else if (type === 'STEEL') products = [...steelProducts]
  else if (type === 'SCREW') products = [...screwProducts]

    try {
    await productStore.createAll({ data: products })
    if (import.meta.env && import.meta.env.MODE === 'development') console.log('Save OK')
  } catch (error) {
    if (import.meta.env && import.meta.env.MODE === 'development') console.log('Save FAILED')
  }
}
</script>

<script>
import { defineComponent } from 'vue';
import Analysis from './Analysis/index.vue';

export default defineComponent({
  components: {
    Analysis
  }
})
</script>
