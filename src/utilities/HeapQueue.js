import Heap from 'heap';

export class HeapQueue {

	constructor() {

		this.heap = new Heap(
			( node1, node2 ) => node2.foveationFactor - node1.foveationFactor
		);

	}

	toArray() {

		return this.heap.toArray();

	}

	push( tile, camera ) {

		const foveationFactor = this.calculateFoveation( tile, camera );
		this.heap.push( { ...tile, foveationFactor } );

	}

	pop() {

		return this.heap.pop();

	}

	size() {

		return this.heap.size();

	}


	rebalance( camera ) {

		this.heap.toArray().forEach( item => {

			item.foveationFactor = this.calculateFoveation( item, camera );

		} );
		this.heap.heapify();

	}

	clear() {

		this.heap = new Heap(
			( node1, node2 ) => node2.foveationFactor * node1.__error - node1.foveationFactor * node1.__error
		);

	}

	delete( tile ) {

		this.heap.replace( { ...tile, foveationFactor: Number.NEGATIVE_INFINITY } );
		this.heap.heapify();
		this.heap.pop();

	}

	calculateFoveation( tile, camera ) {

		if ( tile.__distanceFromCamera - tile.cached.sphere.radius < 0 ) {

			return Number.MAX_VALUE;

		}

		if ( ! tile.__inFrustum ) {

			return Number.NEGATIVE_INFINITY;

		}

		const vector = tile.cached.sphere.center.clone();
		vector.project( camera );
		const normalisedDistanceFromCentre = Math.sqrt( vector.x * vector.x + vector.y * vector.y );
		return Math.max( 1.0 - normalisedDistanceFromCentre / 1.42, 0 );

	}

}
