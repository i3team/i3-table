# I3Table

### Props
Name | Type | Default | Description
:--- | :--- | :--- | :---
`classes` | object | | classes của withStyles
`paper` | boolean | `false` | `true` thì Table sẽ được bọc sẵn bởi 1 `Paper`
`selectedWhere` | func | | hàm nhận vào một row data, trả về bool thể hiện rằng row đó có đang được selected hay không (để bôi đậm)
`hover` | bool | | `true` nếu muốn hover vào row sẽ được highlight
`data`* | arrayOfObject |  |  data
`headRow`* | func |  | hàm trả về các HeadCell
`bodyRow`* | func |  | hàm nhận vào row data và trả về các BodyCell
`getRowKey` | func | `row => row.key` | hàm nhận vào row data và trả về key của row
`grid` | array of number |  | mảng tỷ lệ (theo phần trăm) độ rộng của các cột
`onClickHeadRow` | func |  | 
`onClickRow` | func |  |onClickRow(row, index)
`stickyHeader` | bool |  false |
`rowClassName` | string | |

### Example
[Xem](#https://github.com/i3team/i3-table/blob/master/Demo.jsx)
