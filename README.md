# react-native-helm
Why did I build this framework? I wanted a React Native navigation framework that worked that the way I expected it to. Anyone is more than welcome to submit pull requests or file issues. Any help or feedback is always appreciated.

Just a note, some concepts barrow heavily from other frameworks like [react-native-navigation](https://github.com/wix/react-native-navigation) and [react-native-router-flux](https://github.com/aksonov/react-native-router-flux). Two great solutions that I encourage you to take a look at.

I wanted this framework to be simple to use, but also offer a lot of freedom at the same time. Basically, have some opinions, but not be too pushy about them. At the core this is a framework that allows you to define navigation scenes. But, I did not want scenes to be limited on their ability to navigate to other scenes. Every scene can be a root scene, a pushed scene, or a modal scene. I also wanted a way to customize the scene from almost anywhere in the app. Every scene can have properties declared at the router level, at the scene level, or the navigation level. I wanted the ability to leverage redux to manage my navigation state, but that seemed way too opinionated for me. I didn't want to be tied to redux just have some navigation in my app. My solution was to incorporate separate state management for the navigation so that the navigation can be tied into redux through the use of an action event emitter. I felt like this was the best of both worlds. So to summarize here are the feature bullet points:

* Simple navigation declaration
* Ability to customize navigation properties at almost any level
* Schema support
* Ability to have multiple header buttons
* Drawer support (coming soon)
* Tab support (coming soon)

Documentation is still a work in progress as well. If you see anything out of line or something needs to be explained deeper please file an issue.
