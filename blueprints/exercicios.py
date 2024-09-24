from flask import Blueprint, render_template

# Definir o Blueprint para exercicios
exercicios_bp = Blueprint('exercicios', __name__)

# Definir rotas para o Blueprint
@exercicios_bp.route('/')
def exercicios_home():
    return render_template('menu/exercicios.html')

@exercicios_bp.route('/verb_to_be')
def verb_to_be():
    return render_template('exercicios/verb_to_be.html')

@exercicios_bp.route('/simple_present')
def simple_present():
    return render_template('exercicios/simple_present.html')

@exercicios_bp.route('/present_continuous')
def present_continuous():
    return render_template('exercicios/present_continuous.html')
