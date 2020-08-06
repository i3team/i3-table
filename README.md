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
`onSort` | func | | hàm được invoke khi một `HeadCell` có prop `sortable = true` (xem props `HeadCell`) được click, parameter xem VD demo
`currentOrderBy` | string | | chuỗi thể hiện data hiện tại đang được sort bằng trường nào ở Database

### Props HeadCell
Name | Type | Default | Description
:--- | :--- | :--- | :---
`sortable` | bool | `false` | `true` nếu muốn column đó có thể sort
`orderBy` | string |  | chuỗi thể hiện data sẽ được sort bằng trường nào ở Database nếu column đó được click

### Example
[Xem tại đây](https://github.com/i3team/i3-table/blob/master/Demo.jsx)


# Model C# trả về để render table
Đối với table có paging thì trả về Pagination<T>, nếu không thì trả về List<T>.

## 1. Cần truyền T là gì?
### 1.1 Nếu phục vụ cho table có checkbox để tick chọn thì T là ActionTableItem<X>
ActionTableItem là một class chứa các thông tin cần thiết để JS render table (cấu trúc cha-con, quy định item nào render checkbox,...). 

X bắt buộc là một class được kế thừa từ IActionItem (đọc thêm chú ý cuối mục này). Sở dĩ kế thừa interface IActionItem là để ràng buộc mỗi object dùng để render trong table phải luôn có 1 List EActionPoints, đây là thông tin để table biết phải xử lý object nào tương ứng với các nút ở drawer (vai trò tương tự thông tin phân quyền của object đó, đọc thêm ở mục 3).

Chú ý: các cách để class kế thừa từ IActionItem
#### a) Các class đang có sẵn [DataContract], [DataMember]: kế thừa từ BaseDataMemberActionItem
Class có [DataContract] nên được kế thừa từ class có [DataContract] nên đã tạo sẵn class BaseDataMemberActionItem để kế thừa cho nhanh. Class này đã implement List EActionPoint từ IActionItem và gắn [DataMember] cho trường đó.

Đối với những class POCO thì tạo file partial và kế thừa.

#### b) Các class không có  [DataContract], [DataMember]: kế thừa từ BaseActionItem

#### c) Các class đã có kế thừa từ class khác: kế thừa trực tiếp interface IActionItem và tự hiện thực.
```cshaph
public class Test: TestClass, IActionItem
    {
        public string Id { get; set; }
        public List<EActionPoint> ActionPoints { get; set; }
        public List<Test2> Details { get; set; }
    }
```

### 1.2 Nếu chỉ để render data, không cần tick chọn thì T là TableItem<X>

Trong đó X là một class tùy chọn, không ràng buộc như mục 1.1

## 2. Cách viết thế nào?
### 2.1 ActionTableItem<X>
Demo với class Test ở mục 1.1.c)

Giả sử ServiceHost trả về một danh sách dữ liệu là List<Test>, mỗi object trong list có trường Details thể hiện danh sách con của nó


```cshaph
var returnData = x.Select(i => TableItemHelper.GetActionInstance(
    					data: i,
    					getKey: m => m.Id,
    					isSelectable: true,
    					isDataItem: false,
    					dataType: ETableDataType.Test1,
    					children: i.Details.Select(t1 => TableItemHelper.GetInstance(
    						data: t1,
    						getKey: m => m.Id,
    						isSelectable: true,
    						isDataItem: false,
    						dataType: ETableDataType.Test2
    					)).ToList())).ToList();
```

Các tham số của hàm TableItemHelper.GetActionInstance
Name | Type  | Description
:--- | :--- | :---
`data` | object | dữ liệu dùng để render dòng trong table, kiểu dữ liệu phải kế thừa từ IActionItem | 
`getKey` | func | hàm trả về key đại diện cho data, key này phải là duy nhất  (xem mục 4) | 
`isSelectable` | bool | có hiện checkbox cho row tương ứng hay không | 
`isDataItem` | bool | tham số này bằng true đối với những data mà api ứng với button cần xử lý | 
`dataType` | ETableDataType | enum quy định kiểu dữ liệu của data (xem mục 4) |
`children` | List<TableActionItem<X>> | danh sách con của data, không truyền nếu không có | 

### 2.2 TableItem<X>
Viết tương tự như mục 2.1 nhưng sử dụng hàm
TableItemHelper.GetInstance, hàm này chỉ có 3 tham số là data, getKey và children

## 3. List EActionPoint dùng để làm gì? Sử dụng ra sao?
Trường ActionPoints có kiểu dữ liệu List EActionPoint  dùng để quy định object data tương ứng có thể được thực hiện bởi những action nào. Mỗi button trong drawer sẽ tương ứng với một EActionPoint, từ đó JS có thể xử lý để trả ra các key tương ứng khi nút được click (giá trị của key dựa vào hàm getKey, xem thêm mục 4).

Do EActionPoint là enum dùng chung cho tất cả các nhóm nên việc thêm giá trị cho nó phải tuân thủ cách viết chung để dễ kiểm soát sau này:

```cshaph
    public enum EActionPoint : int
    {
        //Maximum is 2
        #region TEST
        Test = 1,
        #endregion

        #region PACKAGE BATCH
        CanPacked = 2
        #endregion
    }
```
- Mỗi giá trị enum phải nằm trong region cụ thể.
- Tất cả các giá trị enum phải liên tục nhau.
- Mỗi lần thêm giá trị mới, phải cập nhật comment maximum, cập nhật JS và check-in ngay lập tức

## 4. getKey và dataType dùng để làm gì?
getKey là một function trả về string với param đầu vô là object data. Cần hàm getKey với các lý do sau:
- Phục vụ hàm map ở JS để không trùng key (lý do phụ)
- Khi click button ở drawer thì bắn lên key, không bắn full object. Vì sao? Vì việc tick chọn có thể trên nhiều dòng có kiểu dữ liệu khác nhau.
- Nếu chỉ bắn lên key thì server không biết được key này tương ứng với kiểu dữ liệu nào (ví dụ bắn lên key là số 1 thì không biết đây là Id của đơn hàng hay Id của chi tiết đơn hàng), vì thế cần thêm thông tin dataType.
- Quy tắc thêm giá trị cho EDataType tương tự như EActionPoint (không có js)





