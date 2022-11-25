# Web-scan
<p align="center">
  <img style="width:150px" src="https://user-images.githubusercontent.com/93248242/203494537-a21a5dad-c57c-46fc-aa31-34409f26b2c0.png" alt="web-scan-logo" />
</p>

<p align="center">
	<img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
	<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
	<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
	<img src="https://img.shields.io/badge/Electron-47848F?style=flat-square&logo=Node.js&logoColor=white"/>
</p>

## Introduction

**The fast and easy way to check, copy and edit a function component**

Web scan은 웹사이트의 element를 scan하여 컴포넌트 코드로 변환하고, 변환된 컴포넌트를 로컬 파일에 추가하여 반영시킬 수 있는 데스크톱 어플리케이션입니다.
웹페이지 내 특정 element에 마우스를 올려놓으면, 해당 요소의 custom style 정보를 보여주고, 클릭하면 inline CSS와 jsx 문법이 적용된 함수형 컴포넌트 코드를 보여줍니다.
로컬 프로젝트 파일에, 앞에서 변환시킨 컴포넌트를 추가하여 저장하면, 웹사이트에서 본 element를 자신의 리액트 프로젝트에 적용할 수 있습니다.

<br/>

## Motivation

구글 캘린더를 React로 구현하는 과제를 받았을 때, 일간/주간 스케줄의 해당 날짜와 시간에 해당하는 일정 정보를 어떻게 표시할 수 있을까에 대한 해답을 구글 캘린더 사이트에서 크롬 개발자 도구를 열어, 아이디어를 얻었습니다.
크롬 개발자 도구는 기능 구현에 대한 아이디어를 얻을 수 있는 유용한 도구이지만, 단축어를 통해 도구를 열어서 직접 정보를 찾아야하는 불편함이 있습니다.  
또한 리액트 프로젝트에 적용하기 위해서는 선택한 요소부터, 자식 요소까지의 HTML, CSS 정보를 확인하고, IDE로 돌아와 JSX 문법으로 직접 작성해야 했습니다.
따라서 컴포넌트 코드로 변환하여, 자신의 프로젝트에 바로 적용시킬 수 있는 어플리케이션이 있으면, 업무 효율을 올릴 수 있겠다는 생각이 들어 **Web scan**을 제작하게 되었습니다.

<br/>
<br/>

# Contents
- [Web scan](#web-scan)
- [Contents](#contents)
- [Features](#features)
- [Challenges](#challenges)
- [Tech Stacks](#tech-stacks)
- [Install](#install)
- [Development](#development)
- [Schedule](#schedule)
- [Task tools](#task-tools)

<br/>
<br/>

# Features

<table>
  <tr align="center">
    <td>Page</td>
    <td>Screenshot</td>
    <td>Features</td>
  </tr>
  <tr>
    <td align="center">
      Scan
    </td>
    <td align="center">
      <img style="width:900px" src="https://user-images.githubusercontent.com/93248242/203689956-666dfe28-5253-468d-88be-72c6489c07ca.gif" alt="custom-style-modal">
    </td>
    <td>
    <ul>
      <li>사용자가 입력한 URL에 해당하는 웹페이지를 렌더링</li>
      <li>웹페이지 내 특정 element에 mouse hover시, 해당 element의 custom style 정보 확인</li>
    </ul>
    </td>
  </tr>
	<tr>
    <td align="center">
      Scan
    </td>
    <td align="center">
      <img style="width:900px" src="https://user-images.githubusercontent.com/93248242/203692717-36a17a7f-5a09-4578-921a-d5c5d9b022e9.gif" alt="convert-to-component">
    </td>
    <td>
    <ul>
      <li>특정 Element를 click시, 해당 요소의 outerHTML을 jsx 문법의 함수형 컴포넌트로 변환</li>
			<li>해당 요소 및 요소의 자식 요소들의 custom style 계산하여, inline CSS로 반영(style attribute)</li>
			<li>Copy 버튼 클릭시, 클립보드 복사</li>
    </ul>
    </td>
  </tr>
	<tr>
    <td align="center">
      Scan
    </td>
    <td align="center">
			<img style="width:900px" src="https://user-images.githubusercontent.com/93248242/203710820-9d6c3ab1-e19f-408f-bfdc-d78f32bef269.gif" alt="optimization-point">
    </td>
    <td>
    <ul>
      <li>특정 Element를 click시 계산된 custom style에서 CSS 최적화 필요 포인트 발견시, 알림 및 솔루션 제공</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td align="center">Edit file, Preview</td>
    <td align="center">
      <img style="width:900px" src="https://user-images.githubusercontent.com/93248242/203710535-bea16395-04c3-4fd2-87c4-e0fda0fe4f24.gif" alt="access-local-file">
    </td>
    <td>
    <ul>
      <li>사용자의 로컬 파일 열기 및 파일내 코드 에디터 반영</li>
      <li>Scan 페이지에서 가져온 컴포넌트 코드를 로컬 파일에 추가 및 저장하여 로컬 파일 자동 반영</li>
			<li>localhost URL을 입력하여, edit file페이지에서 로컬 파일에 반영한 수정 사항 확인</li>
    </ul>
    </td>
  </tr>
</table>

<br/>
<br/>

# Challenges

### Element의 Custom styles을 어떻게 구할 것인가?
- Style을 적용하는 방법에는 `Inline Style`, `Internal Style Sheet`, `External Style Sheet` 3가지 방식이 있습니다. [HTMLElement.style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) 속성은 element의 Inline Style로 설정된 스타일 값만 알 수 있다는 문제점이 있었습니다. 따라서 `Internal Style Sheet`, `External Style Sheet`으로 작성된 경우에도, element의 style 정보를 알 수 있는 [Window.getComputedStyle](https://developer.mozilla.org/ko/docs/Web/API/Window/getComputedStyle) Web API를 사용하였습니다.
- `Window.getComputedStyle`인자로 전달받은 요소의 모든 CSS 속성값을 담은 객체를 회신하는 데, 이 객체안에 담긴 CSS 속성의 개수가 약 600개로 너무 많아, 이 중에서 default인 값들은 제외하고, 실제 custom된 style값만 추출하기 위하여 아래 사항을 시도하였습니다.
- 첫번째 시도 방법은, 사용자가 볼 수 없는 `iframe element를 생성`하여, target element와 같은 tag명을 가지는 element를 생성하여, iframe의 자식 요소로 지정하고, iframe.contentWindow.getComputedStyle로 style 정보가 담긴 객체를 얻습니다. 그 다음 target element의 getComputedStyle로 계산하여 반환받은 객체를 앞에서 계산한 객체의 값과 비교하여, custom style을 구하는 방법이었습니다. iframe을 사용하면 격리된 상태로 dummy element가 렌더링 되기 때문에, 더 정확한 custom style값을 얻을 수 있다는 장점이 있으나, 계산의 양이 많고, block 요소의 경우 width, height와 값은 일부 기본 스타일이 나열되는 문제점이 있었습니다.
- 두번째 시도 방법은, `dummy element를 생성`하여, dummy element의 getComputedStyle로 계산한 객체와, target element의 getComputedStyle로 계산한 객체의 각 CSS 속성값을 비교하여, custom style을 구하는 방법이었습니다. 이 방법은 반환하는 객체의 속성값이 너무 많고, body의 스타일을 internal style sheet 또는 external style sheet로 설정하는 경우, 최종 반환하는 값에서 의도한 style 값이 누락되는 문제점이 있었습니다.
- 세번째 시도 방법은, [unset](https://developer.mozilla.org/ko/docs/Web/CSS/unset)을 이용하였습니다. target element의 getComputedStyle로 style 정보를 담은 객체를 얻고, 객체내 각 css property key에 대하여, `element.style.setProperty(key, "unset")을 하기 전후의 styles.getPropertyValue(key) 값을 비교`하여 custom style을 구하였습니다. 상속값이 존재하는 경우, 초기값이 아닌 상속값이 적용된다는 문제점이 있지만, 계산의 시간 복잡도가 첫번째 방법보다 유리하고, 두번째 방법에서 있었던 기본 스타일의 나열되는 문제점이 개선되어, 이 로직으로 최종 적용하였습니다. 

<br/>

### Element의 HTML, CSS코드를 어떻게 함수형 컴포넌트 코드로 변환할 것인가?
**1. 함수형 컴포넌트 코드로 변환하였을 때, `각 element마다 가져야할 그리고 삭제되어야하는 정보`를 설정하였습니다.**
- 가져야 할 정보 : Tag name, innerText(존재할 경우), 해당 element의 계산된 Custom style이 style 속성에 객체 타입으로 적용(Inline CSS, JSX 문법에서는 style 속성에 Object 타입으로 넣어주며, 각 CSS property는 케밥 케이스가 아닌 카멜 케이스여야함)
- 삭제되어야 할 정보 : 기존에 지정된 className

**2. 기존에 지정된 className을 삭제할 경우, Style Scan Modal에서 더이상 className이 보이지 않는 문제가 있어, `Queue 자료 구조`를 이용하여 해결하였습니다.**
- 요소와 자식 요소들의 순회하면서, classNameList 배열에 이름을 저장하고, 컴포넌트 코드로 바꾼 후에 다시 요소들을 순회하면서, classNameList의 shift값을 className에 다시 지정하였습니다. 

**3. 변환해야하는 타겟 Element가 자식 노드를 가지고 있을 때, 해당 노드마다 Custom style 계산, className 삭제 등의 작업을 수행하기 위해, `깊이 우선 탐색(DFS) + 전위 순회(Pre-order traversal)을 적용`하였습니다.**

<br/>

<details>
<summary>컴포넌트 변환 함수의 Flow</summary>
<div markdown="1">

```javascript
function convertToComponentCode(element) {
	setInLineStyles(element); // 전위 순회하면서 각 요소의 style 속성에 계산된 Custom style값 지정, 각 요소의 className을 list에 저장하고, className 속성값 비워주기

	const jsxCode = converter.convert(element.outerHTML); // HTML에서 JSX로 변환 

	reapplyClassName(element); // 전위 순회하면서 각 요소의 className 속성에 classNameList.shift()값 지정하기	

	const componentCode = format(jsxCode); // 함수형 컴포넌트 형태로 바꿔주기, indent 적용

	return componentCode;
}
```
</div>
</details>

<br/>
<br/>

# Tech Stack

Base  
`Javascript, React, Node.js, Electron, Recoil`

Style  
`Emotion`

Testing  
`Jest, React-testing-library`

Convention Management  
`Eslint`

Version Management  
`Git`

<br/>
<br/>

# Install

[Release 페이지](https://github.com/Web-scan/web-scan-frontend/releases)에서 최신 버전을 다운로드합니다

<br/>
<br/>

# Development

1. [해당 Repository](https://github.com/Web-scan/web-scan-frontend)를 git clone을 합니다.

2. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행합니다.

    ```
    $ npm install
    $ npm run electron:serve
    ```
<br/>
<br/>

# Schedule
**프로젝트 기간: 2022. 11. 07 ~ 11. 25**

<details>
<summary>1주차 : 기획 및 POC</summary>
<div markdown="1">
  - 아이디어 검토 및 Tech stack 결정
  - Prototype Sketch
  - Git, Code Style 선정
  - Task Scheduling
  - Directory Structure Setting
</div>
</details>

<details>
<summary>2주차 : 기능 개발</summary>
<div markdown="1">
  - UI Layout Setting
  - Custom style 계산 알고리즘 구현
	- Component code 변환 알고리즘 구현
	- File system 접근 및 제어
	- Preview 
</div>
</details>

<details>
<summary>3주차 : 마무리 및 배포</summary>
<div markdown="1">
  - Refactor
	- React 웹 성능 최적화
  - Test Code 작성 : test coverage 80.96% Stmts / 66.12% Branch / 75% Funcs / 83.51% Lines 
  - Desktop App 배포
</div>
</details>

<br/>
<br/>

# Task Tool

- Scheduling: [Notion](https://repeated-monday-afd.notion.site/d2626c0086544669aec0a7dc29a2e2db?v=44c3db16fd3f45958e6bf25bd0514789)
- Mockup Sketch: [Figma](https://www.figma.com/file/FZbWC96I62PW0Uzr4jQbH6/web-scan?node-id=0%3A1&t=yD1nRqunJyvWSmBJ-0)
- Information Archiving: Notion

<br/>
<br/>
