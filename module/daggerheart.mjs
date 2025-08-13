// Setup for Unofficial Daggerheart
async function setUnofficial(params) {
	return game.itempiles.API.addSystemIntegration({
		// The system version
		VERSION: '3.0.4',
		// The actor class type used for the original item pile actor in this system
		ACTOR_CLASS_TYPE: 'character',
		// The attribute used to track the price of items in this system
		ITEM_PRICE_ATTRIBUTE: 'system.cost',
		// The attribute used to track the quantity of items in this system
		ITEM_QUANTITY_ATTRIBUTE: 'system.quantity',
		// The attributes for detecting item similarities
		ITEM_SIMILARITIES: ['name', 'type'],
		// The types of items that will always be considered unique when transferring between actors
		UNSTACKABLE_ITEM_TYPES: [],
		// The filters for item types eligible for interaction within this system
		ITEM_FILTERS: [
			{
				path: 'type',
				filters: 'ancestry, class, community, domain, passive, vault, subclass',
			},
		],
		// The currencies used in this system
		CURRENCIES: [
			{
				type: 'attribute',
				name: 'Coin',
				img: 'icons/svg/coins.svg',
				abbreviation: '{#}C',
				data: {
					path: 'system.treasure.coins.value',
				},
				primary: true,
				exchangeRate: 1,
			},
			{
				type: 'attribute',
				name: 'Handful',
				img: 'icons/svg/pawprint.svg',
				abbreviation: '{#}H',
				data: {
					path: 'system.treasure.handfuls.value',
				},
				primary: false,
				exchangeRate: 10,
			},
			{
				type: 'attribute',
				name: 'Bag',
				img: 'icons/svg/item-bag.svg',
				abbreviation: '{#}B',
				data: {
					path: 'system.treasure.bags.value',
				},
				primary: false,
				exchangeRate: 100,
			},
			{
				type: 'attribute',
				name: 'Chest',
				img: 'icons/svg/chest.svg',
				abbreviation: '{#}CH',
				data: {
					path: 'system.treasure.chests.value',
				},
				primary: false,
				exchangeRate: 1000,
			},
		],
	});
}

// Setup for Foundryborne Daggerheart
async function setFoundryborne(params) {
	return game.itempiles.API.addSystemIntegration({
		// The system version
		VERSION: '1.0.1',
		// The actor class type used for the original item pile actor in this system
		ACTOR_CLASS_TYPE: 'character',
		// The attribute used to track the price of items in this system
		ITEM_PRICE_ATTRIBUTE: '',
		// The attribute used to track the quantity of items in this system
		ITEM_QUANTITY_ATTRIBUTE: 'system.quantity',
		// The attributes for detecting item similarities
		ITEM_SIMILARITIES: ['name', 'type'],
		// The types of items that will always be considered unique when transferring between actors
		UNSTACKABLE_ITEM_TYPES: ['armor', 'weapon'],
		// The filters for item types eligible for interaction within this system
		ITEM_FILTERS: [
			{
				path: 'type',
				filters: 'ancestry, class, community, domainCard, subclass, feature, beastform',
			},
		],
		// The currencies used in this system
		CURRENCIES: [
			{
				type: 'attribute',
				name: 'Coin',
				img: 'icons/svg/coins.svg',
				abbreviation: '{#}C',
				data: {
					path: 'system.gold.coins',
				},
				primary: true,
				exchangeRate: 1,
			},
			{
				type: 'attribute',
				name: 'Handful',
				img: 'icons/svg/pawprint.svg',
				abbreviation: '{#}H',
				data: {
					path: 'system.gold.handfuls',
				},
				primary: false,
				exchangeRate: 10,
			},
			{
				type: 'attribute',
				name: 'Bag',
				img: 'icons/svg/item-bag.svg',
				abbreviation: '{#}B',
				data: {
					path: 'system.gold.bags',
				},
				primary: false,
				exchangeRate: 100,
			},
			{
				type: 'attribute',
				name: 'Chest',
				img: 'icons/svg/chest.svg',
				abbreviation: '{#}CH',
				data: {
					path: 'system.gold.chests',
				},
				primary: false,
				exchangeRate: 1000,
			},
		],
	});
}

Hooks.once('item-piles-ready', async () => {
	console.log('Item Piles | Daggerheart | Setup');

	if (game.system.id === 'daggerheart') {
		await setFoundryborne();
	} else if (game.system.id === 'daggerheart-unofficial') {
		await setUnofficial();
	} else {
		console.error(`Item Piles | Daggerheart | Invalid System ID: ${game.system.id}`);
	}

	// disabled trading by default for now, nether system has proper support
	await game.settings.set('item-piles', 'enableTrading', false);
	ui.players.render();
});
