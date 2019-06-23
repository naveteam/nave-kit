# CONTRIBUTING

We love pull requests, but for contribute you need to follow some pre requisites.


## Initial config

- Install EditorConfig plugin for your code editor to make sure it uses correct settings.
- Clone this repository.
- Follow [standard](https://standardjs.com/) js code style.

## Development

Once you have all dependencies installed, you can run `yarn storybook` to start storybook playground.

Choose a task from our [roadmap](#roadmap) that haven't been already done and start work with it.

All components are inside `src` folder. You need to follow our folder structure.

- Create a react component using functional components (react project version is 16.8.6, so we have hooks :)) inside `src` folder.
- Use Styled Components for styles.
- Create a storybook storie inside stories folder and start build your component.
- Check our [zeplin](https://app.zeplin.io/project/5cbf466cd45ec65486ec3c78/dashboard) for styleguide

## Create documentation

All component folder have a markdown file(.md) that will be used for documentation. We use react [React Styleguidist](https://github.com/styleguidist/react-styleguidist) to create a live documentation for all components.

To run styleguidist type `yarn styleguide` and check our live documentation.


## Commiting

If you want to make a  commit use our script following commitizen. Run `yarn commit` and fill all questions.

## Opening a pull request

We have a pull request template configured inside the project. When you'll open a PR, you need to select the template and fill all pre requisites.