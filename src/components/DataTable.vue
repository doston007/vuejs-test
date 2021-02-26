<template>
  <div class="data-table">
    <table class="table table-bordered" v-if="!isMobile">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="'column_' + index"
            :style="'width:' + column.width"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in currentRows" :key="'row_' + index">
          <th v-for="({ prop }, index) in columns" :key="'th_' + index">
            {{ formatRow(row, prop) }}
          </th>
        </tr>
      </tbody>
    </table>
    <template v-else>
      <div
        class="card mb-4 text-start"
        v-for="(row, index) in currentRows"
        :key="'card_' + index"
      >
        <div class="card-body">
          <div v-for="(column, index) in columns" :key="'info_' + index" class="mb-3">
            <h5 class="card-title">{{ column.label }}</h5>
            <h6 class="card-subtitle text-muted">{{ row[column.prop] }}</h6>
          </div>
        </div>
      </div>
    </template>

    <div class="data-table__paginator">
      <data-paginator v-model="page" :pages="pageCount" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
    chunkedRows() {
      return _.chunk(this.rows, this.pageSize);
    },
    currentRows() {
      return this.chunkedRows[this.page - 1];
    },
    formatRow() {
      const that = this;
      return (row, prop) => {
        switch (prop) {
          case 'date':
            return that.$dateFormat(row[prop]);
          case 'amount':
            return that.$numberFormat(row[prop]);
          default:
            return row[prop];
        }
      };
    },
  },
};
</script>
