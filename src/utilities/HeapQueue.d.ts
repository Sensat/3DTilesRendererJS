import { Camera } from "three";
import { Tile } from "../base/Tile";

export class HeapQueue {
	push(item: Tile): void;
	pop(): Tile & { weight: number };
	size(): number;
	rebalance(camera: Camera): void;
	toArray(): Tile[];
	delete(item: Tile): void;
	clear(): void;
}
