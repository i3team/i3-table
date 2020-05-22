
_onSort = (direction, orderBy) => {
	// direction là giá trị theo Enum `System.Web.Helpers.SortDirection`
	// https://github.com/aspnet/AspNetWebStack/blob/master/src/System.Web.Helpers/SortDirection.cs
	// về phía front-end thì chỉ cần update direction này vào searchModel, trên back-end sẽ handle
	// update object lên search model rồi get data
}
let dataList = [
	{ id: 1, name: 'Quận 1', population: '1000', area: '1000', isSelected: true },
	{ id: 2, name: 'Quận 2', population: '2000', area: '2000', isSelected: false },
	{ id: 3, name: 'Quận 3', population: '3000', area: '3000', isSelected: false },
	{ id: 4, name: 'Quận 4', population: '4000', area: '4000', isSelected: false },
	{ id: 5, name: 'Quận 5', population: '5000', area: '5000', isSelected: false },
	{ id: 6, name: 'Quận 6', population: '6000', area: '6000', isSelected: false },
	{ id: 7, name: 'Quận 7', population: '7000', area: '7000', isSelected: false },
]
return (
	<Fragment>
		<Table
			onSort={this._onSort}
			currentOrderBy={searchModel.orderBy}
			paper
			grid={[10, 15, 25, 25, 25]}
			data={dataList}
			getRowKey={row => row.id}
			headRow={() => (
				<Fragment>
					<HeadCell align="center">
						<EHealthCheckbox
							checked={dataList.every(i => i.isSelected)}
							onChange={e => {
								let cmpr = (a, b) => a.id == b.id;
								this.mergeList(dataList, dataList.map(i => ({ ...i, isSelected: e.target.checked })), cmpr)
							}}
						/>
					</HeadCell>
					<HeadCell align="left">
						ID
					</HeadCell>
					<HeadCell sortable orderBy="Name" align="left">
						Tên quận/TP
					</HeadCell>
					<HeadCell sortable orderBy="Population" align="left">
						Dân số (nghìn người)
					</HeadCell>
					<HeadCell sortable orderBy="Area" align="left">
						Diện tích (km2)
					</HeadCell>
				</Fragment>
			)}
			bodyRow={(row, index) => {
				return (
					<Fragment>
						<BodyCell align="center">
							<EHealthCheckbox
								checked={row.isSelected}
								onChange={e => {
									this.updateObject(row, { isSelected: e.target.checked });
								}}
							/>
						</BodyCell>
						<BodyCell align="left">
							{row.id}
						</BodyCell>
						<BodyCell align="left">
							{row.name}
						</BodyCell>
						<BodyCell align="left">
							{row.population}
						</BodyCell>
						<BodyCell align="left">
							{row.area}
						</BodyCell>
					</Fragment>
				)
			}}
		/>
	</Fragment>
)
