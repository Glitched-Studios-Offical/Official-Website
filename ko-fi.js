// Import the script
const script = document.createElement('script');
script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
document.head.appendChild(script);

// Use a consistent naming convention and a variable for the widget ID
const widgetId = 'glitcheddacat';
const options = {
	type: 'floating-chat',
	floatingChat: {
		donateButton: {
			text: 'Support Us',
			backgroundColor: '#323842',
			textColor: '#fff'
		}
	}
};

script.onload = function() {
	kofiWidgetOverlay.draw(widgetId, options);
};
