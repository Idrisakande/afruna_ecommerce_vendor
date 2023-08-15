import { setAuth10, setToken } from "@/redux/features/auth.slice";
import { updateUserActiveness } from "@/redux/features/user.slice";
import store from "@/redux/store";

class User {
	private store = store.store;
	userActive: boolean = false;
	lastInteractionTime: number = Date.now();

	constructor() {
		this.init();
		this.eventHandlers();
	}

	// Listen for user interactions
	private eventHandlers() {
		document.addEventListener("mousemove", this.mouseMoveEvent);
		document.addEventListener("scroll", this.scrollEvent);
		document.addEventListener("keypress", this.keyPressEvent);
	}
	private mouseMoveEvent() {
		this.update();
	}
	private scrollEvent() {
		this.update();
	}
	private keyPressEvent() {
		this.update();
	}
	// Function to set user as active and update interaction time
	private update() {
		const { dispatch } = this.store;
		this.userActive = true;
		this.lastInteractionTime = Date.now();
		dispatch(updateUserActiveness(this.userActive));
	}

	// Check user activity periodically
	checkUserActivity() {
		const { dispatch } = this.store;
		const currentTime = Date.now();
		const inactiveTime = currentTime - this.lastInteractionTime;

		if (this.userActive && inactiveTime > 30000) {
			// If no activity for 30 seconds
			this.userActive = false;
			//set userActiveness to false
			dispatch(updateUserActiveness(this.userActive));
		}

		setTimeout(this.checkUserActivity, 10000); // Check every 10 seconds
	}
	private init() {
		const { dispatch, getState } = this.store;
		const { user } = getState();
		this.checkUserActivity();
		const cleanup = setInterval(() => {
			//track userActiveness every 15 minutes
			if (!user.isActive) {
				//when user is inactive then destroy priviledges and rights.
				dispatch(setAuth10(false));
				dispatch(setToken(undefined));
				clearInterval(cleanup);
			}
			return;
		}, 1000 * 15);
	}
}
export default User;
