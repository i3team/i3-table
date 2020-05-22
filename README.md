# Table

### Props Table
Name | Type | Default | Description
:--- | :--- | :--- | :---
`classes` | object | | classes của withStyles
`paper` | boolean | `false` | `true` thì Table sẽ được bọc sẵn bởi 1 `Paper`
`selectedWhere` | func | | hàm nhận vào một row data, trả về bool thể hiện rằng row đó có đang được selected hay không (để bôi đậm)
`hover` | bool | | `true` nếu muốn hover vào row sẽ được highlight
`data`* | arrayOfObject |  |  data
`headRow`* | func |  | hàm trả về các `HeadCell`
`bodyRow`* | func |  | hàm nhận vào row data và trả về các `BodyCell`
`getRowKey` | func | `row => row.key` | hàm nhận vào row data và trả về key của row
`grid` | array of number |  | mảng tỷ lệ (theo phần trăm) độ rộng của các cột
`onClickHeadRow` | func |  | 
`onClickRow` | func |  | onClickRow(row, index)
`stickyHeader` | bool |  `false` |
`rowClassName` | string | |
`onSort` | func | | hàm được invoke khi một `HeadCell` có prop `sortable = true` (xem props `HeadCell`) được click
`currentOrderBy` | string | | chuỗi thể hiện data hiện tại đang được sort bằng trường nào ở Database

### Props HeadCell
Name | Type | Default | Description
:--- | :--- | :--- | :---
`sortable` | bool | `false` | `true` nếu muốn column đó có thể sort
`orderBy` | string |  | chuỗi thể hiện data sẽ được sort bằng trường nào ở Database nếu column đó được click

### Example
[Xem tại đây](https://github.com/i3team/i3-table/blob/master/Demo.jsx)
