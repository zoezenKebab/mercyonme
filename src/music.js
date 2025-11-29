var album_clicked_on = false

function get_some_tunes() {
		//music menu is the album grid view
		let music_menu = document.getElementById("music_menu")
		//gets it into view
		let menu_anim = music_menu.animate(
				[
						{opacity: 0},
						{opacity: 1},
				],
				{
						id: "fade",
						duration: 400,
						iterations: 1,
						fill: "both",
						easing: "ease-out",
				}
		)

		menu_anim.onfinish = (event) => {
				//NEED FUTURE PROOFING FOR MORE ALBUMS
				//oh well
				let album = document.createElement("div")
				album.style.height = "50%"
				album.style.aspectRatio = "1/1"
				album.style.position = "relative"
				album.style.top = "0%"
				album.style.left = "0%"
				album.style.margin = "10px"
				album.style.opacity = "0%"
				album.id = "album"
				album.style.cursor = "pointer"
				album.style.flexWrap = "wrap"
				album.style.flexDirection = "row"
				
				album.style.pointerEvents = "auto"
				album.addEventListener("mouseover", cover_in);
				album.addEventListener("mouseout", cover_out);
				album.onclick = (event) => {
						//SAME FUTURE NEEDS TO BE ADRESSED
						//with arguments ? idk
						if (window.album_clicked_on == false) {
								get_album()
						} else {
								back_to_menu()
						}
				}

				album.animate(
						[
								{opacity: 0},
								{opacity: 1},
						],
						{
								id: "fade_in",
								duration: 500,
								iterations: 1,
								fill: "both",
								easing: "linear",
						}
				)
				
				music_menu.appendChild(album)

				let cover = document.createElement("img")
				cover.style.height = "100%"
				cover.style.width = "100%"
				cover.style.top = "0%"
				cover.style.left = "0%"
				cover.style.position = "relative"

				cover.setAttribute("src", "res/covers/SDMvol1.png")
				album.appendChild(cover)

		}
		window.music_open = true
};

function close_tunes() {
		let music_menu = document.getElementById("music_menu")
		//gets it out of view
		let menu_anim = music_menu.animate(
				[
						{opacity: 1},
						{opacity: 0},
				],
				{
						id: "fade",
						duration: 400,
						iterations: 1,
						fill: "both",
						easing: "ease-out",
				}
		)
		let b_cover = document.getElementById("cover_bg")
		let current_opacity = window.getComputedStyle(b_cover).getPropertyValue("opacity")
		b_cover.animate(
				[
						{opacity: current_opacity},
						{opacity: 0},
				],
				{
						duration: 400,
						fill: "both",
						easing: "linear",
				}
		)

		menu_anim.onfinish = (event) => {
				let album = document.getElementById("album")
				let details = document.getElementById("tracks")
				album.remove()
				if (details != null) {
						details.remove()
				}
				

		}

		window.music_open = false
		window.album_clicked_on = false
};


//fades in cool bg on hover of album
function cover_in() {
		if (window.album_clicked_on == false) {
				let b_cover = document.getElementById("cover_bg")
				let current_opacity = window.getComputedStyle(b_cover).getPropertyValue("opacity")
				let preview_fade = b_cover.animate(
						[
								{opacity: current_opacity},
								{opacity: 0.4},
						],
						{
								duration: 1000,
								fill: "both",
								easing: "linear",
						}
				)
		} else {}
		//why else
}

//fades out cool bg
function cover_out() {
		if (window.album_clicked_on == false) {
				let b_cover = document.getElementById("cover_bg")
				let current_opacity = window.getComputedStyle(b_cover).getPropertyValue("opacity")
				let new_duration = current_opacity * 2500
				let preview_fade = b_cover.animate(
						[
								{opacity: current_opacity},
								{opacity: 0},
						],
						{
								duration: new_duration,
								fill: "both",
								easing: "linear",
						}
				)
		} else {}
		//ibidem
}

//get the tunes !
function get_album() {
		window.album_clicked_on = true
		let b_cover = document.getElementById("cover_bg")
		let current_opacity = window.getComputedStyle(b_cover).getPropertyValue("opacity")
		let preview_fade = b_cover.animate(
				[
						{opacity: current_opacity},
						{opacity: 1},
				],
				{
						duration: 1000,
						fill: "both",
						easing: "linear",
				}
		)

		//invent track list
		let track_wrapper = document.createElement("div")
		track_wrapper.style.height = "20%"
		track_wrapper.style.width = "30%"
		track_wrapper.style.minWidth = "350px"
		track_wrapper.style.margin = "10px"
		track_wrapper.style.position = "relative"
		track_wrapper.style.flexWrap = "wrap"
		track_wrapper.style.flexDirection = "row"
		track_wrapper.id = "tracks"

		let music_menu = document.getElementById("music_menu")
		music_menu.appendChild(track_wrapper)

		//WHAT IF MORE ALBUMS ??
		get_tracks(track_wrapper)
}

function get_tracks(wrapper) {

		let album_title = document.createElement("div")
		//WHAT IF MORE ALBUMS ??
		album_title.innerText = "Sons du Menisque vol.1"
		album_title.style.fontFamily = "monospace"
		album_title.style.fontSize = "24px"
		album_title.style.fontWeight = "bold"
		album_title.style.opacity = "0.6"
		album_title.style.marginBottom = "22px"
		album_title.style.position = "relative"
		album_title.style.top = "0%"
		album_title.id = "title"
		wrapper.appendChild(album_title)

		//ibidem FUTURE ??
		for (track_nb in SDM_TRACK_DATA) {
				let current_name = SDM_TRACK_DATA[track_nb][0]
				let track_container = document.createElement("div")
				track_container.style.position = "relative"
				track_container.style.width = "100%"
				track_container.style.height = "40px"
				track_container.style.margin = "4px"
				wrapper.appendChild(track_container)

				let play_button = document.createElement("img")
				play_button.src = "res/play_s.png"
				play_button.style.position = "relative"
				play_button.style.pointerEvents = "auto"
				play_button.style.cursor = "pointer"
				play_button.style.opacity = "0.9"
				play_button.id = current_name
				play_button.addEventListener("mouseover", function() {
						if (window.now_playing == current_name) {
								if (window.p_state == 0) {
										play_button.src = "res/play_s_h.png"
								} else {
										play_button.src = "res/pause_s_h.png"
								}
						} else {
								play_button.src = "res/play_s_h.png"
								}
				}
				)
				play_button.addEventListener("mouseout", function() {
						if (window.now_playing == current_name) {
								if (window.p_state == 1) {
										play_button.src = "res/pause_s.png"
								} else {
										play_button.src = "res/play_s.png"
								}
						} else {
								play_button.src = "res/play_s.png"
						}
				}
				)
				play_button.onclick = (event) => {
						//starts playing tunes
						//player.js
						p_wake(current_name)	

				}
				track_container.appendChild(play_button)

				let text_track = document.createElement("div")
				text_track.innerText = SDM_TRACK_DATA[track_nb][0]
				text_track.style.position = "relative"
				text_track.style.fontFamily = "monospace"
				text_track.style.fontSize = "14px"
				text_track.style.left = "40px"
				text_track.style.top = "-30px"
				text_track.style.opacity = "0.5"
				text_track.style.height = "20px"
				text_track.style.width = "100%"
				text_track.id = "text_" + current_name
				track_container.appendChild(text_track)
				
				//if album view is opened while playing ensure correct styling
				if (current_name == window.now_playing) {
						text_track.style.opacity = "1"
						play_button.src = "res/pause_s.png"
				}
		}
}

function back_to_menu() {
		window.album_clicked_on = false
		let b_cover = document.getElementById("cover_bg")
		let current_opacity = window.getComputedStyle(b_cover).getPropertyValue("opacity")
		let preview_fade = b_cover.animate(
				[
						{opacity: current_opacity},
						{opacity: 0},
				],
				{
						duration: 1000,
						fill: "both",
						easing: "linear",
				}
		)
		let tracks = document.getElementById("tracks")
		tracks.remove()

		let player = document.getElementById("player")
}

//data
//NEEDS FUTURE PROOFING
let SDM_TRACK_DATA = [
		["DEPARTURE", "0:04:33"],
		["BALCONIES", "0:08:02"],
		["CORE", "0:12:12"],
		["ASHORE", "0:09:40"],
		["OUTSKIRTS", "0:12:33"],
		["SUMMIT", "0:27:42"],
]
