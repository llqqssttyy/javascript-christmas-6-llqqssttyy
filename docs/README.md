### ‼️ 이벤트 종류 및 세부사항

> 크리스마스 디데이 할인을 제외한 다른 이벤트는 12월 한달 간 적용

**[할인 이벤트]**

- 크리스마스 디데이 할인: 2023.12.1 ~ 2023.12.25 1,000원으로 시작하여 매일 100원씩 증가. (1일엔 1,000원, 25일엔 3,400원 할인)
- 특별 할인: 매주 일요일, 25일 당일은 총 주문 금액에서 1,000원 할인
- 평일 할인: 일요일 ~ 목요일엔 디저트 메뉴를 메뉴 1개당 2,023원 할인
- 주말 할인: 금요일, 토요일엔 메인 메뉴를 메뉴 1개당 2,023원 할인

**[증정 이벤트]**

- 할인 전 총 주문 금액이 12만원 이상일 때, 샴페인 1개 증정

**[혜택 금액에 따른 배지 부여]**

> 2024 새해 이벤트에서 활용. 배지에 따라 각각 다른 선물을 증정.

- 5,000원 이상: 별
- 10,000원 이상: 트리
- 20,000원 이상: 산타

### 이벤트 유의사항

- 총주문 금액 10,000원 이상부터 이벤트가 적용.
- 음료만 주문 시, 주문 불가.
- 메뉴는 한 번에 20개 까지만 주문 가능.

---

### 🌟 Customer Journey Map

**[Goal of this customer journey map]**

- 고객은 이벤트 플래너를 통해 12월 방문을 예약한다.
- 고객은 예약 날짜와 주문할 메뉴, 메뉴의 개수를 입력한다.
- 고객은 이벤트 플래너에게 예상 혜택을 안내 받는다.

<br/>

<table>
  <tr>
    <th style="max-width: 10rem;">STAGE</th>
    <td style="text-align: center;">방문 날짜 입력</td>
    <td style="text-align: center;">주문할 메뉴와 개수 입력</td>
    <td style="text-align: center;">주문 확인</td>
    <td style="text-align: center;">혜택 확인</td>
    <td style="text-align: center;">이벤트 배지 확인</td>
  </tr>
  <tr>
    <th style="max-width: 10rem;">TOUCHPOINT<br/><span>유저가 여정에서 만나는 접점과 상호작용</span></th>
    <td>
      <p style="text-align: center; margin: 0; padding: 0;">[정보 입력]</p>
      <div style="height: 4rem; margin: 1rem 0;">- 방문 날짜</div>
    </td>
    <td>
      <p style="text-align: center; margin: 0; padding: 0;">[정보 입력]</p>
      <div style="height: 4rem; margin: 1rem 0;">- 주문 메뉴, 개수</div>
    </td>
    <td>
      <p style="text-align: center; margin: 0; padding: 0;">[정보 획득]</p>
      <div style="height: 4rem; margin: 1rem 0;">- 주문 메뉴, 개수<br/>- 할인 전 총 주문 금액</div>
    </td>
    <td>
      <p style="text-align: center; margin: 0; padding: 0;">[정보 획득]</p>
      <div style="height: 4rem; margin: 1rem 0;">- 증정 메뉴<br/>- 혜택 내역<br/>- 총혜택 금액</div>
    </td> 
      <td>
      <p style="text-align: center; margin: 0; padding: 0;">[정보 획득]</p>
    <div style="height: 4rem; margin: 1rem 0;">- 12월 이벤트 배지</div>
    </td>
  </tr>
  <tr>
    <th style="max-width: 10rem;">DOING<br/><span>유저의 행동</span></th>
    <td>방문 날짜를 입력한다.
      <br/>﹗1 이상 31 이하의 숫자만 입력한다.
    </td>
    <td>주문할 메뉴와 개수를 입력한다.
      <br/>﹗메뉴판에 있는 메뉴만 주문한다.
      <br/>﹗메뉴는 1개 이상 시킨다.
      <br/>﹗입력 형식을 지킨다.
      <br/>﹗메뉴를 중복해서 입력하지 않는다.
      <br/>﹗음식의 개수가 총 20개가 넘지 않도록 한다.
      <br/>﹗음료만 주문할 수는 없다.
    </td>
    <td>주문을 확인한다.</td>
    <td>혜택을 확인한다.</td> 
    <td>이벤트 배지를 확인한다.</td>
  </tr>
</table>

<br/>

---

### 예외 처리

#### 1. 공통

- 공백 문자 혹은 ' '를 입력할 경우 예외를 발생시킨다.

#### 1. 방문 날짜를 입력할 때

> 유효하지 않은 날짜입니다. 다시 입력해 주세요.

- 1 이상 31 이하의 숫자 외 다른 문자가 입력되면 예외를 발생시킨다.

- Controller
  - [x] 숫자가 아닌 문자가 입력된 경우

<br/>

- EventPlanner
  - [x] 범위(1 ~ 31)을 벗어날 경우
  - [x] 정수가 아닌 수가 입력될 경우

<br/>

#### 2. 주문할 메뉴와 개수를 입력할 때

> 유효하지 않은 주문입니다. 다시 입력해 주세요.

- Controller
  - [x] `${메뉴}-${개수},`의 형식을 지키지 않을 때 예외를 발생시킨다.
  - [x] 메뉴의 개수로 1이상의 숫자를 입력하지 않을 때 예외를 발생시킨다.
  - [x] 음식의 개별 개수가 21개 이상일 때 예외를 발생시킨다.

<br/>

- Receipt
  - [x] 음식의 총 개수가 21개 이상일 때 예외를 발생시킨다.
  - [x] 중복 메뉴를 입력했을 때 예외를 발생시킨다.
  - [x] 음료만 주문했을 때 예외를 발생시킨다.

<br/>

- OrderItem
  - [x] 메뉴판에 없는 메뉴를 주문하면 예외를 발생시킨다.
