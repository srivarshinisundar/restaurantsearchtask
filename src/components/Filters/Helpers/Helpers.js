import { filters as filtersConfig } from '../../../config/filtersConfig';

const populateFiltersConfig = ({ restaurantCategories, searchResultCategories  }) => {

	restaurantCategories.forEach(elem => {
		if(!filtersConfig.category.values.includes(elem.categories)){
			filtersConfig.category.values.push(elem.categories);
		}
	});

	// searchResultCategories.forEach(elem => {
	// 	if(!filtersConfig.category.values.includes(elem.categories)){
	// 		filtersConfig.category.values.push(elem.categories);
	// 	}
	// });

	// .forEach(elem => {
	// 	if(!filtersConfig.category.values.includes(elem.categories)){
	// 		filtersConfig.category.values.push(elem.categories);
	// 	}
	// });
}

export default {
	populateFiltersConfig
}