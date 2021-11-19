import React from 'react';
import _, { sortBy } from 'lodash';

// components
import Card from './Card/Card';

// config
import { restaurant as restaurantConfig } from '../../config/SearchResultsConfig';

import { Checkbox } from 'antd';

import Loader from '../../hoc/Loader/Loader';


const getRestaurantCardComponent = (restaurantObj, city, idx) => {
	let temp = {};

	Object.keys(restaurantConfig).forEach((elem, idx) => {
		let value = _.get(restaurantObj, restaurantConfig[elem].path, '');

		if (restaurantConfig[elem].extraData) {
			restaurantConfig[elem].extraData.forEach((ele) => {
				if (ele.insertAt === 'end') {
					value += ele.message ? ele.message : ` ${_.get(restaurantObj, ele.path, '')}`;
				} else if (ele.insertAt === 'start') {
					value = (ele.message ? ele.message : _.get(restaurantObj, ele.path, '')) + ` ${value}`;
				}
			});
		}
		temp[elem] = value;
	});

	return <Card key={idx}
		city={city}
		name={temp.name}
		thumb_image_url={temp.thumb}
		restaurant_id={temp.restaurant_id}
		aggregate_rating={temp.aggregate_rating}
		rating_color={temp.rating_color}
		votes={temp.votes}
		address_short={temp.address_short}
		address_long={temp.address_long}
		cuisines={temp.cuisines}
		average_cost_for_two={temp.average_cost_for_two} />
}

const fetchedResults = (props) => {
	let city = props.city;

	const [average_cost_for_two, setAverage_cost_for_two] = React.useState(true)
	const [rating, setRating] = React.useState(false)
	const [loader, setLoader] = React.useState(false)
	const [data, setData] = React.useState(props.restaurants)
	let restaurantsList = data.map((elem, idx) => getRestaurantCardComponent(elem.restaurant, city, idx));

	const sortByPrice = (costData) => {
		console.log("data price", costData)
		costData.sort(function (a, b) { return b.restaurant.average_cost_for_two - a.restaurant.average_cost_for_two });
		setData(costData)
		console.log("data price sorted", costData)
		setLoader(false)
	}

	const sortByRating = (rateData) => {
		console.log("data rating", rateData[0].restaurant.aggregate_rating)
		rateData.sort(function (a, b) { return (parseFloat(b.restaurant.user_rating.aggregate_rating) - parseFloat(a.restaurant.user_rating.aggregate_rating	)) })
		setRating(rateData)
		console.log("data rating sorted", rateData)
		setLoader(false)
	}

	const onChange = (value) => {
		setLoader(true)
		if (value === "price") {
			setAverage_cost_for_two(true)
			setRating(false)
		} else if (value === "rating") {
			setAverage_cost_for_two(false)
			setRating(true)
		}
	}

	React.useEffect(() => {
		setData([...props.restaurants])
	}, [props.restaurants])

	React.useEffect(() => {
		if (average_cost_for_two && data.length > 0) {
			sortByPrice(data)
		}
	}, [average_cost_for_two])

	React.useEffect(() => {

		if (rating && data.length > 0) {
			sortByRating(data)
		}
	}, [rating])

	return (
		<div>
			{loader ? <Loader /> : null}
			<Checkbox checked={average_cost_for_two} onChange={() => onChange("price")}>Sort By Price</Checkbox>
			<Checkbox checked={rating} onChange={() => onChange("rating")}>Sort By Rating</Checkbox>
			{data.map((elem, idx) => getRestaurantCardComponent(elem.restaurant, city, idx))}
		</div>
	);
};

export default fetchedResults;