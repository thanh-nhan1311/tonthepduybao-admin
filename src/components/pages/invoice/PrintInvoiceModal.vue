<template>
  <a-modal
    v-model:visible="isShowModal"
    centered
    width="780px"
    title="In hoá đơn"
    ok-text="In hoá đơn"
    cancel-text="Đóng"
    @ok="print"
    @cancel="emits('close', null)"
  >
    <div v-if="isShowModal" id="printInvoiceContainer">
      <component :is="'style'">
        .print-container {
          min-width: calc(148px * 4);
          max-width: calc(148px * 5);
          min-height: calc(210px * 3);
          max-height: calc(210px * 5);
          margin: auto;
        }
        
        ul {
          margin: 0;
          list-style-type: none;
          padding: 0;
        }
        ul li {
          margin-bottom: 0.15em;
        }

        .pi-section1 {
          display: flex;
          justify-content: space-between;
        }
        .pi-section1 h3 {
          font-weight: 600;
        }
        .pi-section1 .logo {
          display: flex;
          align-items: center;
          margin-bottom: 0.5em;
        }
        .pi-section1 .logo img {
          width: 48px;
        }

        .pi-section1 > div:first-child h3 {
          margin: 0;
        }
        .pi-section1 > div:last-child h3 {
          margin: 0.5em 0;
        }

        .pi-section2 {
          display: flex;
          align-items: center;
          border: solid 1px #e5e7eb;
          margin-top: 2em; 
          width: 100%;
        }
        .pi-section2 > ul {
          display: flex;
          flex-direction: column;
          width: 50%;
          padding: 1em;
        }
        .pi-section2 > ul:first-child {
          border-right: 1px solid #e5e7eb;
        }
        .pi-section2 > ul:first-child li:nth-child(1) {
          margin-bottom: 1em;
          font-weight: 600;
        }
        .pi-section2 > ul:first-child li:nth-child(2) {
          margin-bottom: 0.5em;
          font-weight: 600;
        }

        .pi-section2 > ul:last-child li,
        .pi-section2 > ul:first-child li span {
          font-weight: 600;
        }
        .pi-section2 > ul:last-child li:nth-child(2) {
          margin-bottom: 1em;
        }

        .pi-section3 {
          margin-top: 1em;
        }
        .pi-section3 p {
          margin-bottom: 0.5em;
        }

        .print-table {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-right: none;
          border-bottom: none;
        }
        .print-table thead tr th,
        .print-table tbody tr td {
          padding: 0.25em 1em;
          border-right: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          text-align: center;
        }
        .print-table thead tr th:nth-child(1),
        .print-table tbody tr td:nth-child(1) { width: 10%; }
        .print-table thead tr th:nth-child(2),
        .print-table tbody tr td:nth-child(2) { width: 30%; }
        .print-table thead tr th:nth-child(3),
        .print-table tbody tr td:nth-child(3) { width: 20%; }
        .print-table thead tr th:nth-child(4),
        .print-table tbody tr td:nth-child(4) { width: 20%; }
        .print-table thead tr th:nth-child(5),
        .print-table tbody tr td:nth-child(5) { width: 20%; }
        .print-table tbody tr td.td-total-label {
          padding-left: 3em;
          font-weight: 600;
          text-align: left;
        }
        .print-table tbody tr td.td-total-price {
          font-weight: 600;
        }

        .pi-section4 {
          margin-top: 1em;
        }
        .pi-section4 p {
          margin-bottom: 0.1em;
          font-style: italic;
          font-weight: 600;
        }
        .pi-section4 ul {
          padding: 0 0 0 3em;
        }

        .pi-section5 {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 2em;
          padding-bottom: 6em;
        }
        .pi-section5 li {
          width: 33%;
          text-align: center;
          font-weight: 600;
        }

        @media print {
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }
          .pi-section1 *,
          .pi-section2 *,
          .pi-section3 *,
          .pi-section4 *,
          .pi-section5 * {
            font-size: 12pt !important;
            line-height: 14pt !important;
          }
        }

      </component>
      <div class="print-container">
        <div class="pi-section1">
          <div>
            <div class="logo">
              <img src="/img/single-logo.png" alt="ttdb" />
              <h3>Tôn Thép Duy Bảo</h3>
            </div>
            <ul>
              <li>CN1: 80 đường 5, LX, TĐ - 0939922078</li>
              <li>CN2: 63 Hoàng Hữu Nam, TPss TĐ - 0937658178</li>
              <li>CN3: 190 Nguyễn Văn Tăng, L.Tr, TĐ - 0906658178</li>
            </ul>
          </div>

          <div>
            <h3>Phiếu Báo Giá</h3>
            <ul>
              <li>Số: {{ invoice.id }}/{{ invoice.date.substring(4) }}</li>
              <li>Ngày {{ moment.dFormat(invoice.date) }}</li>
            </ul>
          </div>
        </div>
        
        <div class="pi-section2">
          <ul>
            <li>Khách hàng: {{ invoice.customer.name }}</li>
            <li>Thông tin giao hàng</li>
            <li><span>Người nhận:</span> {{ invoice.shippingAddress.name }}</li>
            <li><span>Số ĐT:</span> {{ invoice.shippingAddress.phone }}</li>
            <li><span>Địa chỉ:</span> {{ invoice.shippingAddress.address }}</li>
          </ul>

          <ul>
            <li>TRẦN VĂN GIAI</li>
            <li>26676678 - ACB - Chi nhánh TĐ</li>
            <li>NGUYỄN THỊ NGỌC THUỶ</li>
            <li>6302205314223 - Agribank</li>
          </ul>
        </div>

        <div class="pi-section3">
          <p>Công ty trân trọng báo giá các mặt hàng sau:</p>
          <table class="print-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên hàng</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of invoice.invoiceProducts" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.product.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ formatCurrency(item.unitPrice) }}</td>
                <td>{{ formatCurrency(item.quantity * item.unitPrice) }}</td>
              </tr>
              <tr>
                <td colspan="4" class="td-total-label">Tổng cộng:</td>
                <td colspan="1" class="td-total-price">{{ formatCurrency(totalInvoicePrice) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pi-section4">
          <p>Ghi chú:</p>
          <ul>
            <li>- Quý khách kiểm trang hàng trước khi nhận hàng.</li>
            <li>- Quý khách bảo quản hàng nơi khô ráo, vệ sinh mặt sắt.</li>
            <li>- Hoá đơn GTGT có giá trị 07 ngày kể từ ngày mua hàng.</li>
          </ul>
        </div>

        <ul class="pi-section5">
          <li>Người nhận hàng</li>
          <li>Người giao hàng</li>
          <li>Người lập phiếu</li>
        </ul>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { isNil } from 'lodash'
import { computed, ref, toRef, watch } from 'vue'
import { useMoment } from '~/composables'
import { formatCurrency, windowPrint } from '~/modules/utils'

const emits = defineEmits(['close'])
const props = defineProps({
  invoice: {
    type: Object,
    required: true
  }
})
const invoiceProp = toRef(props, 'invoice')

const moment = useMoment()

// state
const isShowModal = ref(false)
const totalInvoicePrice = computed(() => invoiceProp.value.invoiceProducts
  .map(item => item.quantity * item.unitPrice)
  .reduce((a, b) => a + b)
)

// functions
const print = () => 
  windowPrint(document.querySelector('#printInvoiceContainer').innerHTML)

// Watcher
watch(
  invoiceProp,
  (newValue) => isShowModal.value = !isNil(newValue),
  { deep: true }
)
</script>
