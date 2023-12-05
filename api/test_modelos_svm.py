from model.avaliador import Avaliador
from model.carregador import Carregador
#from model.modelo import Model
from model import Model

# Instanciação das Classes
carregador  = Carregador()
modelo      = Model()
avaliador   = Avaliador()

# Parâmetros    
url_dados = "database/records_dataset.csv"
colunas   = ['age','anaemia','creatinine_phosphokinase','diabetes','ejection_fraction','high_blood_pressure','platelets','serum_creatinine','serum_sodium','sex','smoking','time','DEATH_EVENT']
# Carga dos dados
dataset = carregador.carregar_dados(url_dados, colunas)

# Separando em dados de entrada e saída
X = dataset.iloc[:, 0:-1]
Y = dataset.iloc[:, -1]

# Método para testar o modelo de Regressão Logística a partir do arquivo correspondente
def test_modelo_svm():  
    path = 'ml_model/classificador.pkl'
    modelo_svm = Model.carrega_modelo(path)

    # Obtendo as métricas da Regressão Logística
    acuracia, recall, precisao, f1 = avaliador.avaliar(modelo_svm, X, Y)
    
    # Modifique as métricas de acordo com seus requisitos
    assert acuracia >= 0.30
    assert recall >= 0.30
    assert precisao >= 0.30 
    assert f1 >= 0.30
