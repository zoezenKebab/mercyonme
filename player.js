var p_state = 1
var now_playing = "NULL"

function initialize_drn() {
		let player = document.getElementById("audio")
		player.volume = 0
		player.play()

		let fader = setInterval(function() {
				if (player.volume < 0.3) {
						player.volume += 0.01
				} else {
						window.clearInterval(fader)
				}
		}, 800)
}

function initialize_master_button() {
		let master_button = document.getElementById("p_button")
		let player = document.getElementById("audio")

		master_button.onclick = (event) => {
				let target_button = document.getElementById(window.now_playing)
				if (p_state == 1) {
						player.pause()
						window.p_state = 0
						update_buttons(target_button, 0)
				} else {
						player.play()
						window.p_state = 1
						update_buttons(target_button, 1)
				}
		}
}

function p_wake() {
		let target = arguments[0]
		let audio = document.getElementById("audio")
		audio.loop = false
		audio.volume = 0.6

		
		if (target != now_playing) {
				window.now_playing = target
				p_play(target, audio)
				window.p_state = 1
		} else {
				if (window.p_state == 1) {
						p_stop(target, audio)
						window.p_state = 0
				} else {
						resume(target, audio)
						window.p_state = 1
				}
		}

		//PLAYLISTING ANYONE ??
		if (now_playing != "NULL") {
				playlist_setup()
		}
}

function p_play() {
		let target = arguments[0]
		let audio = arguments[1]
		let button = document.getElementById("p_button")
		let target_button = document.getElementById(target)
		let target_text = document.getElementById("text_" + target)
		let master_button = document.getElementById("p_button")

		update_buttons(master_button, 1)
		update_buttons(target_button, 1)
		target_text.style.opacity = "0.9"
		button.src =  "res/pause_s.png"
		audio.src = "res/SDM/" + target + ".wav"
		audio.play()

		//ensure all buttons gets good styling on playing
		normalize_buttons(window.now_playing) 
}

function p_stop() {
		let target = arguments[0]
		let audio = arguments[1]
		let target_button = document.getElementById(target)
		let master_button = document.getElementById("p_button")

		update_buttons(master_button, 0)
		update_buttons(target_button, 0)
		audio.pause()
}

function resume() {
		let target = arguments[0]
		let audio = arguments[1]
		let target_button = document.getElementById(target)
		let master_button = document.getElementById("p_button")
		
		update_buttons(master_button, 1)
		update_buttons(target_button, 1)
		audio.play()
}

function update_buttons() {
		let target = arguments[0]
		let state = arguments[1]

		if (state == 0) {
				target.src = "res/play_s.png"
		} else {
				target.src = "res/pause_s.png"
		}
}

//de-opacify text of songs that are not playing
function normalize_buttons(target_song) {
		let track_wrapper = document.getElementById("tracks")
		let master_tracks = track_wrapper.children
		for (i in master_tracks) {
				//NEED FUTURE PROOFING
				//oh the horrors i'm doing
				//targets only the needed objects ie. track name & track button
				//(html is a mess)
				if (master_tracks[i].id != ["title"] && master_tracks[i].children != null) {
						if (master_tracks[i].children[0].id != target_song) {
								master_tracks[i].children[1].style.opacity = "0.5"
								master_tracks[i].children[0].src = "res/play_s.png"
						} else {
								master_tracks[i].children[1].style.opacity = "1"
								master_tracks[i].children[0].src = "res/pause_s.png"
						}
				}
		}
}

function responsive_ui() {
		let p_button = document.getElementById("p_button")
		p_button.addEventListener("mouseover", function() {
						if (p_state == 1) {
								p_button.setAttribute("src", "res/pause_s_h.png")
						} else {
								p_button.setAttribute("src", "res/play_s_h.png")
						}
				}
		)
		p_button.addEventListener("mouseout", function() {
						if (p_state == 1) {
								p_button.setAttribute("src", "res/pause_s.png")
						} else {
								p_button.setAttribute("src", "res/play_s.png")
						}
				}
		)
}

//everybody knows what a horse is
function modify_volume() {
		let target = arguments[0]
		let audio = document.getElementById("audio")

		if (target == 0 && audio.volume > 0.08) {
				audio.volume -= 0.08
		} else if (target == 1 && audio.volume < 0.92) {
				audio.volume += 0.08
		}
}

//plays the next tracks :)
function playlist_setup() {
		let audio = document.getElementById("audio")
		//^^
		audio.onended = (event) => {
				//I fuckign hate javascript
				//meow
				let new_song_idx = TRACK_ORDER.indexOf(now_playing) + 1
				//important
				window.now_playing = TRACK_ORDER[new_song_idx]
				//NEEDS FUTURE PROOFING
				if (new_song_idx == 6) { new_song_idx = 0 }
				let target_song = "res/SDM/" + TRACK_ORDER[new_song_idx] + ".wav"

				audio.src = target_song
				audio.load()
				audio.oncanplay = (event) => {
						audio.play()
						//I swear I'm playing another track rn
						normalize_buttons(TRACK_ORDER[new_song_idx])
						}
		}
}

var TRACK_ORDER = [
		"DEPARTURE",
		"BALCONIES",
		"CORE",
		"ASHORE",
		"OUTSKIRTS",
		"SUMMIT"
]
