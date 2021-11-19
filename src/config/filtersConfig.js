module.exports = {
	filters: {
		category: {
			label: 'CATEGORY',
			values: [],
			path: {
				name: 'name',
				id: 'id'
			},
			queryKey: 'category',
			uri_encode: true,
		},
		sortbyprice: {
			label: "SORT BY PRICE",
			values: [],
			path: {
				name: 'average_cost_for_two',
				id: 'id'
			},
			queryKey: 'average_cost_for_two',
			uri_encode: true,
		},
		sortbyrating: {
			label: "SORT BY RATINGS",
			values: [],
			path: {
				name: 'cuisines',
				id: 'id'
			},
			queryKey: 'cuisines',
			uri_encode: true,
		},
	}
}