from pydantic import BaseModel
from typing import Optional, List
from model.paciente import Paciente
import json
import numpy as np

class PacienteSchema(BaseModel):
    """ Define como um novo paciente a ser inserido deve ser representado
    """
    name                     : str = "Maria"
    age                      : int = 56
    anaemia                  : int = 0
    creatinine_phosphokinase : int = 23
    diabetes                 : int = 0
    ejection_fraction        : int = 33
    high_blood_pressure      : int = 0
    platelets                : int = 120000
    sex                      : int = 1
    serum_creatinine         : float = 0.5
    serum_sodium             : float = 134.00
    smoking                  : int = 0
    time                     : int = 60



    
class PacienteViewSchema(BaseModel):
    """Define como um paciente será retornado
    """
    id: int = 1
    name                     : str = "Maria"
    age                      : int = 56
    anaemia                  : int = 0
    creatinine_phosphokinase : int = 23
    diabetes                 : int = 0
    ejection_fraction        : int = 33
    high_blood_pressure      : int = 0
    platelets                : int = 120000
    sex                      : int = 1
    serum_creatinine         : float = 0.5
    serum_sodium             : float = 134.00
    smoking                  : int = 0
    time                     : int = 60
    
class PacienteBuscaSchema(BaseModel):
    """Define como deve ser a estrutura que representa a busca.
    Ela será feita com base no nome do paciente.
    """
    name: str = "Maria"

class ListaPacientesSchema(BaseModel):
    """Define como uma lista de pacientes será representada
    """
    pacientes: List[PacienteSchema]

    
class PacienteDelSchema(BaseModel):
    """Define como um paciente para deleção será representado
    """
    name: str = "Maria"
    
# Apresenta apenas os dados de um paciente    
def apresenta_paciente(paciente: Paciente):
    """ Retorna uma representação do paciente seguindo o schema definido em
        PacienteViewSchema.
    """
    return {
        "id"                      : paciente.id,
        "name"                    : paciente.name,
        "age"                     : paciente.age,
        "anaemia"                 : paciente.anaemia,
        "creatinine_phosphokinase": paciente.creatinine_phosphokinase,
        "diabetes"                : paciente.diabetes,
        "ejection_fraction"       : paciente.ejection_fraction,
        "high_blood_pressure"     : paciente.high_blood_pressure,
        "platelets"               : paciente.platelets,
        "sex"                     : paciente.sex,
        "serum_creatinine"        : paciente.serum_creatinine,
        "serum_sodium"            : paciente.serum_sodium,
        "smoking"                 : paciente.smoking,
        "time"                    : paciente.time
    }
    
# Apresenta uma lista de pacientes
def apresenta_pacientes(pacientes: List[Paciente]):
    """ Retorna uma representação do paciente seguindo o schema definido em
        PacienteViewSchema.
    """
    result = []
    for paciente in pacientes:
        result.append({
        "id"                      : paciente.id,
        "name"                    : paciente.name,
        "age"                     : paciente.age,
        "anaemia"                 : paciente.anaemia,
        "creatinine_phosphokinase": paciente.creatinine_phosphokinase,
        "diabetes"                : paciente.diabetes,
        "ejection_fraction"       : paciente.ejection_fraction,
        "high_blood_pressure"     : paciente.high_blood_pressure,
        "platelets"               : paciente.platelets,
        "sex"                     : paciente.sex,
        "serum_creatinine"        : paciente.serum_creatinine,
        "serum_sodium"            : paciente.serum_sodium,
        "smoking"                 : paciente.smoking,
        "time"                    : paciente.time
        })

    return {"pacientes": result}

