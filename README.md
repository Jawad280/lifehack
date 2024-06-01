# Inventorize: Advanced Demand Forecasting and Inventory Management

### Video Demo:
https://drive.google.com/file/d/1OkpA5AVxOdAkPfXt6NeCvEovzL0emTkh/view?usp=sharing

## Overview
Inventorize leverages cutting-edge machine learning technologies to empower food businesses with accurate demand prediction and efficient inventory management. By analyzing historical data, our application predicts the necessary volume of food items needed, allowing businesses to optimize their supply chains and reduce food waste significantly.

### Key Features

**Accurate Demand Prediction**
- Our web application utilizes a Random Forest regression model to analyze past sales data and accurately predict future demand. This enables restaurant owners to precisely gauge the amount of ingredients required, optimizing food production.

**Inventory Management**
- The application provides actionable insights into inventory levels, helping businesses maintain optimal stock. This minimizes risks associated with overstocking or understocking, thereby reducing spoilage and ensuring availability to meet customer demand.

**Logistics Optimization**
- By providing precise demand forecasts, our tool aids in streamlining the supply chain, ensuring efficient distribution of food items to various locations, which in turn reduces transportation costs and delivery delays.

**Reduction in Food Waste**
- Enhanced planning and accurate demand forecasts lead to a substantial reduction in food waste. Our application assists suppliers in managing their production more effectively, promoting a sustainable food supply chain.

## Technical Implementation

### Data Processing and Model Training

**Data Preprocessing**
- The initial dataset, consisting of food orders from a restaurant, undergoes formatting to ensure accurate date parsing and handling of missing values.

**Feature Engineering**
- We extract meaningful features from the 'Order Date', such as day and month, and employ one-hot encoding on the 'Item Name' to transform it into a model-ready format.

**Model Training and Evaluation**
- The features include the day of the week, month, and encoded item names, with 'Quantity' as the target variable. We split the data into training and testing sets, train a Random Forest model, and evaluate its performance using the Mean Squared Error (MSE) metric.

**Model Usage**
- The trained model predicts the required quantity for each item based on the day and month. It can be saved and loaded for future use, ensuring consistency in predictions.

### Integration of Prophet Model

**Prophet Model Implementation**
- We explored using Facebook's Prophet model for its robustness in handling time series data. Prophet is adept at managing missing data, outliers, and capturing seasonal trends, making it ideal for daily sales predictions.

**Key Features of the Prophet Model**
- Handles seasonality and outliers effectively and incorporates special occasions and holidays into its forecasts.

### Application Development

**Backend**
- The backend, implemented in a Jupyter Notebook, preprocesses data, trains the Prophet model, and handles forecast generation.

**Database Management**
- We use Supabase for storing and managing both historical and forecasted sales data, facilitating real-time data operations and integration with the frontend.

**Frontend**
- Developed with Next.js and TypeScript, the frontend offers a user-friendly interface for data input, tracking, and visualization. It interacts seamlessly with Supabase to retrieve and display data.

**Dashboard and Reporting**
- A comprehensive dashboard displays predictions, current inventory statuses, and provides optimization recommendations. This tool is invaluable for generating detailed reports for stakeholders.

## Conclusion

Inventorize stands at the forefront of technological innovation in food service management. By integrating sophisticated forecasting models like Random Forest and Prophet with a robust web application, we provide unparalleled support to businesses aiming to optimize their operations and reduce environmental impact.

---
