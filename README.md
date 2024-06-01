Inventorize

Accurate Demand Prediction:
Our web application utilizes advanced machine learning algorithms to analyze historical data and predict the volume of food items required on a given day. By accurately forecasting this volume, shop owners can better gauge the amount of ingredients and supplies needed, ensuring they produce the right amount of food. 

Inventory Management:
The application provides real-time insights into optimal inventory levels. Knowing the exact volume to produce helps shop owners maintain the right amount of stock for ingredients and supplies. This reduces the risk of overstocking and understocking, minimizing food waste due to spoilage and ensuring sufficient stock to meet demand.

Logistics Optimization:
With precise demand forecasts, the supply chain can be optimized for efficient distribution. The application helps optimize the supply chain by ensuring that the right quantities of food are transported to the right locations at the right times, reducing transportation costs and minimizing delays.

Reduction in Food Waste:
Better planning and demand prediction lead to a significant reduction in food waste. Suppliers can avoid overproduction and manage their inventory more effectively, contributing to a more sustainable food supply chain.


To address the problem statement, we explored two different machine learning models  to predict daily food demand based on historical sales data. Firstly, we employed a Random Forest regressor, which handles both numerical and categorical data and provides a robust solution to non-linear data patterns.

Implementation steps:

Data Preprocessing
We used a sample data set on food orders from a restaurant. The columns were converted to the right format and missing values were accounted for.
Feature Engineering
From the ‘Order Date’, the day and month were derived. The 'Item Name' column is treated as a categorical variable and is transformed using one-hot encoding. This process converts each unique item name into a separate binary (0 or 1) feature, suitable for regression analysis.
Model Training
Features  include the day of the week, month, and one-hot encoded item names. The target (y) is the 'Quantity', which represents the total items sold per day for each item. The dataset is split into training and testing sets using a random seed for reproducibility. A Random Forest regressor is initialized with 100 trees and fitted on the training data. Random Forests are used due to their ability to model complex relationships without severe overfitting.
Model Evaluation
After training, the model's performance is evaluated on the test set using the Mean Squared Error (MSE) metric. This metric provides a measure of the average squared difference between the actual and predicted quantities, offering insight into the model's accuracy.
Model Usage 
The trained model can predict the required quantity of each item for a given day by inputting the corresponding features (day of the week, month, and item type through one-hot encoding) into the model. The model and the one-hot encoder can be saved using joblib or a similar library to preserve the state for later use in production or further evaluation.

We also explored the possibility of leveraging the Prophet model, a powerful forecasting tool developed by Facebook. Prophet is designed to handle time series data and is particularly effective for daily sales predictions due to its robustness in dealing with missing data and outliers, as well as its ability to capture seasonal effects.

Prophet Model for Daily Sales Prediction:
The Prophet model will be trained using historical sales data, which includes various factors such as daily sales volumes, dates, and potential external factors influencing sales. By incorporating this data, Prophet can create a predictive model that forecasts future daily sales with high accuracy.

Key Features of the Prophet Model:
Handling Seasonality: Prophet can capture weekly and yearly seasonality patterns in sales data, making it ideal for understanding and predicting trends.

Dealing with Outliers: The model is robust to outliers, which ensures that sudden spikes or drops in sales do not disproportionately affect the overall prediction accuracy.

Incorporating Holidays and Special Occasions: Prophet allows for the inclusion of holiday effects and special events, which is crucial for accurately forecasting sales during these periods.

Implementation Steps:

Data Collection and Preprocessing:
We gathered historical sales data from various sources, including sales records and inventory levels, which was stored in Supabase. This data was cleaned and preprocessed in a Jupyter Notebook to ensure it was ready for analysis.

Model Selection and Training:
The Prophet model was implemented and trained in a Jupyter Notebook. We used the historical sales data to train the model, capturing patterns and trends specific to our dataset. The trained model was then used to generate sales forecasts.

Application Development:

Backend (Prophet Model in Jupyter Notebook):

The Prophet model was developed and trained in a Jupyter Notebook. This notebook is used to preprocess data, train the model, and generate forecasts.
The forecasts generated by the Prophet model are stored in Supabase for easy access and integration with the frontend.
Database (Supabase):

Supabase was used as the database to store historical sales data and the forecasted sales data generated by the Prophet model.
Supabase provides real-time capabilities and easy integration with the frontend via RESTful APIs.

Frontend (Next.js Application):

The frontend was developed using Next.js and TypeScript to provide a user-friendly interface for data input, tracking, and visualization.
Users can upload CSV files containing historical sales data, which are processed and stored in Supabase.
The frontend communicates with the Supabase database to fetch historical data and display sales forecasts generated by the Prophet model.

Dashboard and Reporting:
We implemented a dashboard in the Next.js frontend to display sales predictions, current inventory levels, and optimization recommendations. The dashboard provides real-time insights and allows users to generate reports for different stakeholders.
